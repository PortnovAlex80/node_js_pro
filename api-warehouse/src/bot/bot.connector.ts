import { Scenes, Telegraf, Types } from 'telegraf';
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

		const stage = new Scenes.Stage<IBotContext>([
			testScene,
			new ProductListScene(this.productsService),
		]);

		this.bot = new Telegraf<IBotContext>(this.token);
		this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
		this.bot.use(stage.middleware());
		this.bot.use(async (ctx, next) => {
			console.log('MIDDLEWARE OK');
			next();
		});

		this.commands = [new StartCommand(this.bot)];
		for (const command of this.commands) {
			command.handle();
		}

		this.bot.command('test', (ctx) => ctx.scene.enter('test'));

		this.bot.launch();
		this.logger.log(`[BOT] Telegramm bot launched`);

		process.once('SIGINT', () => this.bot.stop('SIGINT'));
		process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
	}
}

// GET http://localhost:3000/products
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG43QGpvaG4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc5MDc4MjQxfQ.gm7nOT-lMFoQDNSKT1LvtWyZwc6Muafh3RLN-OqErXk
