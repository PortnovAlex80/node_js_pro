import { App } from './app';
import { UserController } from './users/users.controller';

async function bootstrap() {
	const app = new App(new UserController());
	await app.init();
}

bootstrap();
