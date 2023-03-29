import { Context, Scenes } from 'telegraf';
import type { Update } from 'telegraf/typings/core/types/typegram';
import SceneContextScene from 'telegraf/typings/scenes/base';

export interface IBotSessionData {
	sessionData: string;
}

export interface IBotContext extends Context {
	props: string;
	session: IBotSessionData;
}
// export interface MyContext<U extends Update = Update> extends Context<U> {
// 	props: string;
// 	session: MySession;
// 	scene: Scenes.SceneContextScene<MyContext, MySessionScene> | undefined;
// }
