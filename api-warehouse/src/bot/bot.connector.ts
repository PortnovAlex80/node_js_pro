import { Markup, Scenes, Telegraf, Types } from 'telegraf';
import { IConfigService } from '../config/config.service.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IBotContext } from './context/context.interface';
import { ProductsService } from '../products/products.service';
import LocalSession from 'telegraf-session-local';
import { Command } from './commands/command.class';
import { StartCommand } from './commands/start.command';
import { testScene } from './scenes/test.scene';
import { ProductListScene } from './scenes/products.list.scene';
import { ProductAddNameItemScene } from './scenes/products.addNameItem.scene';
import { ProductAddItemQuantityScene } from './scenes/products.addItemsQuantity.scene';
const { leave } = Scenes.Stage;

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

		const productListScene = new ProductListScene(this.productsService);
		const productAddNameItemScene = new ProductAddNameItemScene();
		const productAddItemQuantityScene = new ProductAddItemQuantityScene(
			this.productsService,
		);
		const stage = new Scenes.Stage<IBotContext>([
			testScene,
			productListScene,
			productAddNameItemScene,
			productAddItemQuantityScene,
		]);

		this.bot = new Telegraf<IBotContext>(this.token);

		this.bot.start(async (ctx) => {
			await ctx.reply(
				'Hello! Lets go purchase!',
				Markup.keyboard([['Warehouse', 'Add item']])
					.oneTime()
					.resize(),
			);
		});

		this.bot.use(new LocalSession({ database: 'session.json' }).middleware());

		this.bot.use(async (ctx, next) => {
			console.log('MIDDLEWARE OK');
			next();
		});
		this.bot.use(stage.middleware());

		this.bot.hears('Warehouse', (ctx) => ctx.scene.enter('productListScene'));
		this.bot.hears('Add item', (ctx) =>
			ctx.scene.enter('ProductAddNameItemScene'),
		);

		this.bot.command('test', (ctx) => console.log('sdfsd'));

		this.commands = [new StartCommand(this.bot)];
		for (const command of this.commands) {
			command.handle();
		}
		this.bot.command('test', (ctx) => ctx.scene.enter('test'));
		this.bot.command('list', (ctx) => ctx.scene.enter('productListScene'));
		this.bot.command('add', (ctx) =>
			ctx.scene.enter('ProductAddNameItemScene'),
		);

		this.bot.launch();

		this.logger.log(`[BOT] Telegramm bot launched`);

		process.once('SIGINT', () => this.bot.stop('SIGINT'));
		process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
	}
}
