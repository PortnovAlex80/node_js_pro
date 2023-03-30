import { Scenes, Markup, Context, session, Telegraf } from 'telegraf';
import { ProductsService } from '../../products/products.service';
import { IBotContext } from '../context/context.interface';
import 'reflect-metadata';

export class ProductListScene extends Scenes.BaseScene<IBotContext> {
	constructor(private productsService: ProductsService) {
		super('productListScene');
		const { leave } = Scenes.Stage;
		this.enter((ctx) => this.onEnter(ctx));
		this.action('prevPage', this.prevPage);
		this.action('nextPage', this.nextPage);
		this.command('off', leave<IBotContext>());
		this.command('back', leave<IBotContext>());
		//this.leave((ctx) => ctx.reply('BUY OFF!'));
	}
	private async onEnter(ctx: IBotContext) {
		ctx.reply(
			'Добро пожаловать! Для просмотра списка товаров введите "Список товаров".',
		);
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
			Markup.inlineKeyboard([
				[
					Markup.button.callback('⬅️ Назад', 'prevPage'),
					Markup.button.callback('Вперед ➡️', 'nextPage'),
				],
			]),
		);
	}

	private async prevPage(ctx: Context) {
		await ctx.reply('off');
		// Реализуйте логику для навигации на предыдущую страницу товаров
		// и отправьте обновленный список товаров
		await ctx.answerCbQuery();
	}
	private async nextPage(ctx: Context) {
		await ctx.reply('off');
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
