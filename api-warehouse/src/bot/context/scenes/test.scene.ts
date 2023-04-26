import { Markup, Scenes } from 'telegraf';
import { IBotContext } from '../context.interface';
const { leave } = Scenes.Stage;

export const testScene = new Scenes.BaseScene<IBotContext>('test');
testScene.enter((ctx) => onEnter(ctx));
testScene.command('back', leave<IBotContext>());
testScene.on('text', (ctx) => ctx.reply(ctx.message.text));
testScene.command('off', leave<IBotContext>());
testScene.leave((ctx) => ctx.reply('BUY!'));

async function onEnter(ctx: IBotContext) {
	await ctx.reply(
		`Список товаров:\n}`,
		Markup.inlineKeyboard([
			[
				Markup.button.callback('⬅️ Назад', 'back'),
				Markup.button.callback('Вперед ➡️', 'nextPage'),
			],
		]),
	);
}

async function prevPage(ctx: IBotContext) {
	await ctx.reply('back');
	// Реализуйте логику для навигации на предыдущую страницу товаров
	// и отправьте обновленный список товаров
	await ctx.answerCbQuery();
}
async function nextPage(ctx: IBotContext) {
	await ctx.reply('back');
	// Реализуйте логику для навигации на следующую страницу товаров
	// и отправьте обновленный список товаров
	await ctx.answerCbQuery();
}
