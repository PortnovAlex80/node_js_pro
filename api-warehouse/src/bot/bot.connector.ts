import { Telegraf } from 'telegraf';
import { IConfigService } from '../config/config.service.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import axios from 'axios';

@injectable()
export class TelegramBotApp {
	apiUrl = 'http://localhost:3000/products';
	token: string;
	bot: Telegraf;
	headers = {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG43QGpvaG4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc5MDc4MjQxfQ.gm7nOT-lMFoQDNSKT1LvtWyZwc6Muafh3RLN-OqErXk',
	};

	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.token = this.configService.get('TOKEN');
		if (!this.token) {
			throw new Error('Token is not found');
		}

		// Инициализируем объект Telegraf и добавляем методы для обработки команд
		this.bot = new Telegraf(this.token);
		this.handleStartCommand();
		this.handleListProductsCommand();

		// Запускаем бота
		this.bot.launch();
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
				const response = await axios.post(
					this.apiUrl,
					{},
					{ headers: this.headers },
				);
				const products = response.data;
				ctx.reply(`Список доступных товаров:\n${products.join('\n')}`);
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
