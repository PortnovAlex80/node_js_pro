import { Scenes, Markup, Context, session } from 'telegraf';
import { ProductsService } from '../../products/products.service';
import { MyContext } from '../mycontext';
import 'reflect-metadata';
import { BaseScene } from 'telegraf/typings/scenes/base';
//import BaseScene from 'telegraf/typings/scenes/base';
// import { BaseScene } from 'telegraf/typings/scenes';

export class ProductListScene extends BaseScene {
	constructor(private productsService: ProductsService) {
		super('productListScene');
		this.enter(this.onEnter);
		this.action('prevPage', this.prevPage);
		this.action('nextPage', this.nextPage);
		this.action('callbackQuery', this.callbackQuery);
	}

	private async onEnter(ctx: Context) {
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
}

// const appContainer = new Container();
// appContainer.load(appBindings);
// const productServiceInstance = appContainer.get<ProductsService>(
// 	TYPES.ProductsService,
// );

// const productListScene = new ProductListScene(productServiceInstance);

// export { productListScene };
