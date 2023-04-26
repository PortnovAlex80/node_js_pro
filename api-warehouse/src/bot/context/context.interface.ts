import { Context, Scenes } from 'telegraf';
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
