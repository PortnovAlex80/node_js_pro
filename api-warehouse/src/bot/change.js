// test script
import { Scenes, session, Telegraf, Types } from 'telegraf';
import { inject, injectable } from 'inversify';
import { ProductsService } from '../products/products.service';

@injectable()
export class TelegramBotApp {
	token: string;
	bot: Telegraf;
	constructor(
		@inject(TYPES.ProductsService) private productsService: ProductsService,
	) {
		this.token = this.configService.get('TOKEN');

		const stage = new Scenes.Stage<MyContext>([new ProductListScene(productsService)]);
		this.bot = new Telegraf(this.token);
		this.bot.start(start);
		this.bot.launch();
	}
}

@injectable()
export class ProductListScene extends BaseScene {
	constructor() {
		super('productListScene');
		this.enter(this.onEnter);
	}

	private async onEnter(ctx: Context) {
		const products = await this.productsService.getProducts();
		if (!products) {
			return null;
		}
		const message = 'products'
}
