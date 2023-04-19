import { Context, Scenes } from 'telegraf';
import type { Update } from 'telegraf/typings/core/types/typegram';
import SceneContextScene from 'telegraf/typings/scenes/base';
import { ProductDto } from '../../products/dto/product.dto';

interface IBotSceneSession extends Scenes.SceneSessionData {
	sessionSceneData: string;
}

interface IBotSession extends Scenes.SceneSession<IBotSceneSession> {
	botSession: string;
	itemSesseion: ProductDto;
}
export interface IBotContext extends Context {
	props: string;

	session: IBotSession;
	scene: Scenes.SceneContextScene<IBotContext, IBotSceneSession>;
}
