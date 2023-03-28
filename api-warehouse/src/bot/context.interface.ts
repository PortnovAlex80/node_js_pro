import { Context, Scenes } from 'telegraf';
import type { Update } from 'telegraf/typings/core/types/typegram';
import SceneContextScene from 'telegraf/typings/scenes/base';

export interface MySessionScene extends Scenes.SceneSessionData {
	myProps: string;
}

export interface MySession extends Scenes.SceneSession<MySessionScene> {
	myProp: string;
}
// export interface MyContext<U extends Update = Update> extends Context<U> {
// 	props: string;
// 	session: MySession;
// 	scene: Scenes.SceneContextScene<MyContext, MySessionScene> | undefined;
// }

export interface MyContext extends Context {
	props: string;
	session: MySession;
	scene: Scenes.SceneContextScene<MyContext, MySessionScene>;
}
