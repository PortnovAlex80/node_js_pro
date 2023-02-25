import { App } from './app';
import { ExceptionFilter } from './exceptionhandlers/exception.filter';
import { LoggerService } from './services/logger.service';

export interface IBootstrapReturn {
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const logger = new LoggerService();
	const app = new App(logger, new ExceptionFilter(logger));
	await app.init();
	return { app };
}

bootstrap();
