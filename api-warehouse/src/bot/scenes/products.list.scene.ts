import { Scenes, Markup, Context, session, Telegraf } from 'telegraf';
import { ProductsService } from '../../products/products.service';
import { IBotContext } from '../context/context.interface';
import 'reflect-metadata';
import { BaseScene } from 'telegraf/typings/scenes/base';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';

@injectable()
export class ProductListScene extends Scenes.BaseScene<IBotContext> {
	constructor(private productsService: ProductsService) {
		super('productListScene');
		this.enter(this.onEnter.bind(this));
		this.action('prevPage', this.prevPage);
		this.action('nextPage', this.nextPage);
		this.action('callbackQuery', this.callbackQuery);
		this.command('off', this.leave());
	}
	private async onEnter(ctx: IBotContext) {
		ctx.reply(
			'Добро пожаловать! Для просмотра списка товаров введите "Список товаров".',
		);
		const products = await this.productsService.getProducts(); // получаем первые 10 товаров
		if (!products) {
			return null;
		}

		const message = products
			.map(
				(product, index) =>
					`${index + 1}. ${product.name} - ${product.quantity}`,
			)
			.join('\n');

		ctx.reply(message);

		await ctx.reply(
			`Список товаров:\n${message}`,
			Markup.inlineKeyboard([
				[
					Markup.button.callback('⬅️ Назад', 'prevPage'),
					Markup.button.callback('Вперед ➡️', 'nextPage'),
				],
			]),
		);
	}

	private async prevPage(ctx: Context) {
		// Реализуйте логику для навигации на предыдущую страницу товаров
		// и отправьте обновленный список товаров
		await ctx.answerCbQuery();
	}
	private async nextPage(ctx: Context) {
		// Реализуйте логику для навигации на следующую страницу товаров
		// и отправьте обновленный список товаров
		await ctx.answerCbQuery();
	}

	private async callbackQuery(ctx: Context) {
		// Реализуйте логику для навигации на следующую страницу товаров
		// и отправьте обновленный список товаров
		await ctx.answerCbQuery();
	}

	// private async handleStartCommand() {
	// 	this.bot.command('start', (ctx) => {
	// 		ctx.reply(
	// 			'Добро пожаловать! Для просмотра списка товаров введите "Список товаров".',
	// 		);
	// 	});
	// }

	// private async  handleListProductsCommand() {
	// 	this.bot.hears('Список товаров', async (ctx) => {
	// 		try {
	// 			const products = this.productsService.getProducts();
	// 			this.logger.log(`${JSON.stringify(products)}`);
	// 			ctx.reply(`Список доступных товаров:\n${JSON.stringify(products)}`);
	// 		} catch (error) {
	// 			console.log(error);
	// 			ctx.reply(
	// 				'Произошла ошибка при получении списка товаров. Попробуйте еще раз позже.',
	// 			);
	// 		}
	// 	});
	// }
}

// const appContainer = new Container();
// appContainer.load(appBindings);
// const productServiceInstance = appContainer.get<ProductsService>(
// 	TYPES.ProductsService,
// );

// const productListScene = new ProductListScene(productServiceInstance);

// export { productListScene };
