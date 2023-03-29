import { Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';
const { leave } = Scenes.Stage;

export const testScene = new Scenes.BaseScene<IBotContext>('test');
testScene.enter((ctx) => ctx.reply('HELLOO!'));
testScene.command('back', leave<IBotContext>());
testScene.on('text', (ctx) => ctx.reply(ctx.message.text));
testScene.leave((ctx) => ctx.reply('BUY!'));
