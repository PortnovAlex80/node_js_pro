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
			const userInput = ctx.message.text;
			const isNumber = isNaN(Number(userInput));
			if (!isNumber) {
				await this.enterItemQuantity(ctx);
			} else {
				ctx.reply('Enter number value');
			}
		});
	}
	private async enterItemQuantity(ctx: any) {
		const itemQuantity = ctx.message.text;
		const itemName = ctx.session.itemSesseion.name;
		ctx.reply(`${itemName} quantity ${itemQuantity} added`);
		const item: ProductDto = { name: itemName, quantity: Number(itemQuantity) };
		ctx.session.itemSesseion = item;
		const addItemResult = await this.productsService.createProduct(item);
		ctx.scene.leave();
	}
}
