import { Container } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './exceptionhandlers/exception.filter';
import { ILogger } from './services/logger.interface';
import { LoggerService } from './services/logger.service';
import { IExceptionFilter } from './exceptionhandlers/exception.filter.interface';

export interface IBootstrapReturn {
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const appConteiner = new Container();
	appConteiner.bind<ILogger>(Symbol.for('ILogger')).to(LoggerService);
	appConteiner.bind<IExceptionFilter>(Symbol.for('IExceptionFilter')).to(ExceptionFilter);
	appConteiner.bind<App>(Symbol.for('App')).to(App);

	const app = appConteiner.get<App>(Symbol.for('App'));
	await app.init();
	return { app };
}

bootstrap();
