import { Markup, Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';
const { leave } = Scenes.Stage;

export const testScene = new Scenes.BaseScene<IBotContext>('test');
testScene.enter((ctx) => onEnter(ctx));
testScene.command('back', leave<IBotContext>());
testScene.on('text', (ctx) => ctx.reply(ctx.message.text));
testScene.leave((ctx) => ctx.reply('BUY!'));

async function onEnter(ctx: IBotContext) {
	await ctx.reply(
		`Список товаров:\n}`,
		Markup.inlineKeyboard([
			[
				Markup.button.callback('⬅️ Назад', 'prevPage'),
				Markup.button.callback('Вперед ➡️', 'nextPage'),
			],
		]),
	);
}
