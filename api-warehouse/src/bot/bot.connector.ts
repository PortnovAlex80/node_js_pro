import { Scenes, Telegraf, Types } from 'telegraf';
import { IConfigService } from '../config/config.service.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { CMD_TEXT } from './bot.const.commands';
import { backMenu, start } from './bot.command';
import { ProductListScene } from './scenes/scene.products.list';
import { IBotContext } from './context/context.interface';
import { ProductsService } from '../products/products.service';
import LocalSession from 'telegraf-session-local';
import { Command } from './commands/command.class';
import { StartCommand } from './commands/start.command';

@injectable()
export class TelegramBotApp {
	token: string;
	bot: Telegraf<IBotContext>;
	commands: Command[] = [];

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ProductsService) private productsService: ProductsService,
	) {
		this.token = this.configService.get('TOKEN');
		if (!this.token) {
			throw new Error('Token is not found');
		}

		const testScene = new Scenes.BaseScene<IBotContext>('test');
		testScene.enter((ctx) => ctx.reply('HELLOO!'));
		//const stage = new Scenes.Stage<IBotContext>([testScene]);

		this.bot = new Telegraf<IBotContext>(this.token);
		this.bot.use(new LocalSession({ database: 'session.json' }).middleware());

		this.commands = [new StartCommand(this.bot)];
		for (const command of this.commands) {
			command.handle();
		}

		// this.bot.use(stage.middleware());
		this.bot.use(async (ctx, next) => {
			ctx.props = ctx.message?.chat.type ? ctx.message?.chat.type : 'empty';
			console.log(ctx.props);
			console.log('MIDDLEWARE OK');
			next();
		});

		// const start = async (ctx: MyContext) => {
		// 	ctx.reply(
		// 		'Добро пожаловать! Для просмотра списка товаров введите "Список товаров".',
		// 	);
		// };

		// this.bot.on('message', (ctx) => {
		// 	console.log(ctx.message);
		// 	const chatId = ctx.chat.id;
		// });

		// this.bot.start(start);
		// this.bot.hears(CMD_TEXT.menu, backMenu);

		// this.bot.command('test', (ctx) => ctx.scene.enter('test'));
		this.bot.launch();
		this.logger.log(`[BOT] Telegramm bot launched`);

		process.once('SIGINT', () => this.bot.stop('SIGINT'));
		process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
	}

	private handleStartCommand() {
		this.bot.command('start', (ctx) => {
			ctx.reply(
				'Добро пожаловать! Для просмотра списка товаров введите "Список товаров".',
			);
		});
	}

	private handleListProductsCommand() {
		this.bot.hears('Список товаров', async (ctx) => {
			try {
				const products = this.productsService.getProducts();
				this.logger.log(`${JSON.stringify(products)}`);
				ctx.reply(`Список доступных товаров:\n${JSON.stringify(products)}`);
			} catch (error) {
				console.log(error);
				ctx.reply(
					'Произошла ошибка при получении списка товаров. Попробуйте еще раз позже.',
				);
			}
		});
	}
}

// GET http://localhost:3000/products
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG43QGpvaG4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc5MDc4MjQxfQ.gm7nOT-lMFoQDNSKT1LvtWyZwc6Muafh3RLN-OqErXk
