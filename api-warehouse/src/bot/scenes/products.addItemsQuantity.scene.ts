import { Scenes, Markup, Context, session, Telegraf } from 'telegraf';
import { ProductsService } from '../../products/products.service';
import { IBotContext } from '../context/context.interface';
import 'reflect-metadata';
import { ProductDto } from '../../products/dto/product.dto';

export class ProductAddItemQuantityScene extends Scenes.BaseScene<IBotContext> {
	constructor(private productsService: ProductsService) {
		super('ProductAddItemQuantityScene');
		const { leave } = Scenes.Stage;
		this.enter((ctx) => ctx.reply('Enter Quantity'));
		this.on('text', async (ctx) => {
			const quantity = Number(ctx.message.text);
			const name = ctx.session.itemSesseion.name;
			if (quantity) {
				await this.enterItemQuantity(name, quantity);
				ctx.session.itemSesseion = {
					name: name,
					quantity: Number(quantity),
				};
				ctx.reply(`${name} quantity ${quantity} added`);
				ctx.scene.leave();
			} else {
				ctx.reply('Enter number value');
			}
		});
	}
	private async enterItemQuantity(name: string, quantity: number) {
		const addItemResult = await this.productsService.createProduct({
			name: name,
			quantity: Number(quantity),
		});
	}
}
