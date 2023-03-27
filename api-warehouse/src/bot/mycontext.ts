import { Context, Scenes } from 'telegraf';
import SceneContextScene from 'telegraf/typings/scenes/base';

export interface MySessionScene extends Scenes.SceneSessionData {
	myProps: string;
}

export interface MySession extends Scenes.SceneSession<MySessionScene> {
	myProp: string;
}

export interface MyContext extends Context {
	props: string;
	session: MySession;
	scene: Scenes.SceneContextScene<MyContext, MySessionScene>;
}
