import { Scenes } from 'telegraf';
import { IBotContext } from '../context.interface';

export class ProductAddNameItemScene extends Scenes.BaseScene<IBotContext> {
	constructor() {
		super('ProductAddNameItemScene');
		this.enter((ctx) => ctx.reply('Enter items name'));
		this.on('text', async (ctx) => {
			const itemName = ctx.message.text;
			await ctx.scene.enter('ProductAddItemQuantityScene');
			ctx.session.itemSesseion = { name: itemName, quantity: 0 };
		});
	}
}
