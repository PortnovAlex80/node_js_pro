import { Scenes, Markup, Context, session, Telegraf } from 'telegraf';
import { ProductsService } from '../../products/products.service';
import { IBotContext } from '../context/context.interface';
import 'reflect-metadata';

export class ProductListScene extends Scenes.BaseScene<IBotContext> {
	constructor(private productsService: ProductsService) {
		super('productListScene');
		const { leave } = Scenes.Stage;
		this.enter((ctx) => this.onEnter(ctx));
	}
	private async onEnter(ctx: IBotContext) {
		ctx.reply('Добро пожаловать!\n Our Warehouse\n "Список товаров".');
		const products = await this.productsService.getProducts();
		if (!products) {
			return null;
		}

		const message = await products
			.map(
				(product, index) =>
					`${index + 1}. ${product.name} - ${product.quantity}`,
			)
			.join('\n');

		await ctx.reply(
			`Список товаров:\n${message}`,
			// Markup.inlineKeyboard([[Markup.button.callback('Add', 'addItem')]]),
		);

		ctx.scene.leave();
	}
}
