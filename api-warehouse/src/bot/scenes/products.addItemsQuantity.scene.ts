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
			await this.enterItemQuantity(ctx);
		});
	}
	private async enterItemQuantity(ctx: any) {
		const itemName = ctx.message.text;
		console.log(`item quantity ${itemName} added`);
		ctx.reply(`item quantity ${itemName} added`);
		const item: ProductDto = { name: 'Hummer', quantity: 1 };
		const addItemResult = await this.productsService.createProduct(item);
		console.log(addItemResult);
		ctx.scene.leave();
	}
}
