import { App } from './app';

export interface IBootstrapReturn {
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const app = new App();
	await app.init();
	return { app };
}

bootstrap();
