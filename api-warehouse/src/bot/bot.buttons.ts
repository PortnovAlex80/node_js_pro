import { Markup } from 'telegraf';
import { CMD_TEXT } from './bot.const.commands';

export const mainMenu = Markup.keyboard([
	[CMD_TEXT.start],
	[CMD_TEXT.menu],
]).resize();

export const backButtonMenu = Markup.keyboard([[CMD_TEXT.menu]]);
