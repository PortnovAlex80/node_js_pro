import { Scenes, session, Telegraf, Types } from 'telegraf';
import { IConfigService } from '../config/config.service.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import axios from 'axios';
import { CMD_TEXT } from './bot.const.commands';
import { backMenu, start } from './bot.command';
import { ProductListScene } from './scenes/scene.products.list';
import { MyContext } from './mycontext';
import { ProductsService } from '../products/products.service';
import LocalSession from 'telegraf-session-local';

@injectable()
export class TelegramBotApp {
	apiUrl = 'http://localhost:3000/products';
	token: string;
	bot: Telegraf;
	headers = {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG43QGpvaG4uY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Nzk4MTc5Nzh9.vJ44HPgGnVGFmk-o9xDeaDLN2QbBkBfdqU2r8-lj7-c',
	};

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ProductsService) private productsService: ProductsService,
	) {
		this.token = this.configService.get('TOKEN');
		if (!this.token) {
			throw new Error('Token is not found');
		}
		// Инициализируем объект Telegraf и добавляем методы для обработки команд
		const productListScene = new ProductListScene(productsService);
		//const stage = new Scenes.Stage<MyContext>([productListScene]);
		//this.bot.use(session());
		// this.bot.use(stage.middleware());
		this.bot = new Telegraf<MyContext>(this.token);
		// this.bot(
		// 	new LocalSession({
		// 		database: 'session.json',
		// 	}).middleware(),
		// );
		// this.bot.use((ctx, next) => {
		// 	ctx.session.myProp;
		// 	ctx.scene.session.myProps;
		// });
		const start = async (ctx: MyContext) => {
			ctx.reply(
				'Добро пожаловать! Для просмотра списка товаров введите "Список товаров".',
			);
		};

		this.bot.start(start);
		this.bot.hears(CMD_TEXT.menu, backMenu);

		// Запускаем бота
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
				const response = await axios.get(this.apiUrl, {
					headers: this.headers,
				});
				const products = response.data;
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
