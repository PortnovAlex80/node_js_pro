import { Scenes } from 'telegraf';
import { ProductsService } from '../../../products/products.service';
import { IBotContext } from '../context.interface';
import 'reflect-metadata';
export class ProductAddItemQuantityScene extends Scenes.BaseScene<IBotContext> {
	constructor(private productsService: ProductsService) {
		super('ProductAddItemQuantityScene');
		this.enter((ctx) => ctx.reply('Enter Quantity'));
		this.on('text', async (ctx) => {
			const quantity = Number(ctx.message.text);
			const name = ctx.session.itemSesseion.name;
			if (!quantity) {
				ctx.reply('Enter number value');
			}
			await this.enterItemQuantity(name, quantity);
			ctx.session.itemSesseion = {
				name: name,
				quantity: Number(quantity),
			};
			ctx.reply(`${name} quantity ${quantity} added`);
			ctx.scene.leave();
		});
	}
	private async enterItemQuantity(name: string, quantity: number) {
		return await this.productsService.createProduct({
			name: name,
			quantity: quantity,
		});
	}
}
