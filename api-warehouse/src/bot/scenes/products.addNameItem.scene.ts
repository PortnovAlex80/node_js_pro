import { Scenes, Markup, Context, session, Telegraf } from 'telegraf';
import { ProductsService } from '../../products/products.service';
import { IBotContext } from '../context/context.interface';
import 'reflect-metadata';
import { ProductDto } from '../../products/dto/product.dto';

export class ProductAddNameItemScene extends Scenes.BaseScene<IBotContext> {
	constructor() {
		super('ProductAddNameItemScene');
		const { leave } = Scenes.Stage;
		this.enter((ctx) => ctx.reply('Enter items name'));
		this.on('text', async (ctx) => {
			await this.enterItemName(ctx);
			await ctx.scene.enter('ProductAddItemQuantityScene');
		});
	}
	private async enterItemName(ctx: any) {
		const itemName = ctx.message.text;
		await console.log(`item ${itemName} added`);
		await ctx.reply(`item ${itemName} added`);
		const item: ProductDto = { name: itemName, quantity: 0 };
		ctx.session.itemSesseion = item;

		//ctx.itemSesseion = item;
		console.log(`conterxt cxt item = ${ctx.itemSesseion}`);
		await ctx.scene.leave();
	}
}
