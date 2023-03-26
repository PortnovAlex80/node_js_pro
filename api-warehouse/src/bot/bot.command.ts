import { mainMenu } from './bot.buttons';
import { Context } from 'telegraf';

export const start = (ctx: Context) =>
	ctx.reply('Hello!', {
		...mainMenu,
	});

export const backMenu = (ctx: Context) =>
	ctx.reply('backMenu!', {
		...mainMenu,
	});

export const aaa = (ctx: Context) => {
	ctx.reply(
		'Добро пожаловать! Для просмотра списка товаров введите "Список товаров".',
	);
};

export function handleStartCommand(ctx: Context) {
	ctx.reply(
		'Добро пожаловать! Для просмотра списка товаров введите "Список товаров".',
	);
}

export async function handleListProductsCommand(ctx: Context) {
	try {
		ctx.reply(`Список доступных товаров:\n`);
	} catch (error) {
		console.log(error);
		ctx.reply(
			'Произошла ошибка при получении списка товаров. Попробуйте еще раз позже.',
		);
	}
}
