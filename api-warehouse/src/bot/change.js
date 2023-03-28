import { Scenes, session, Telegraf, Types } from 'telegraf';
import 'reflect-metadata';
import axios from 'axios';
import { CMD_TEXT } from './bot.const.commands';
import { backMenu, start } from './bot.command';
import { MyContext } from './mycontext';
import { ProductsService } from '../products/products.service';


@injectable()
export class TelegramBotApp {
	token: string;
	bot: Telegraf;

	constructor(	) {
		this.token = this.configService.get('TOKEN');
		const testScene = new Scenes.BaseScene<MyContext>('test');
		testScene.enter((ctx) => ctx.reply('HELLOO!'));
		const stage = new Scenes.Stage<MyContext>([testScene]);
		this.bot = new Telegraf<MyContext>(this.token);
		this.bot.use(session());

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

}
