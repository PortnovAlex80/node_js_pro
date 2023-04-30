import { Scenes } from 'telegraf';
import { IBotContext } from '../context.interface';

export class ProductAddNameItemScene extends Scenes.BaseScene<IBotContext> {
	constructor() {
		super('ProductAddNameItemScene');
		this.enter((ctx) => ctx.reply('Enter items name'));
		this.on('text', async (ctx) => {
			ctx.session.itemSesseion = { name: ctx.message.text, quantity: 0 };
			await ctx.scene.enter('ProductAddItemQuantityScene');
		});
	}
}
