import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './exceptionhandlers/exception.filter';
import { ILogger } from './services/logger.interface';
import { LoggerService } from './services/logger.service';
import { IExceptionFilter } from './exceptionhandlers/exception.filter.interface';
import { WeatherController } from './controller/weather.controller';
import { WeatherService } from './services/weather.service';
import { OpenWeatherApi } from './api/openweatherapi';

export const addBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(Symbol.for('ILogger')).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(Symbol.for('IExceptionFilter')).to(ExceptionFilter);
	bind<WeatherController>(Symbol.for('WeatherController')).to(WeatherController);
	bind<WeatherService>(Symbol.for('WeatherService')).to(WeatherService);
	bind<OpenWeatherApi>(Symbol.for('OpenWeatherApi')).to(OpenWeatherApi);
	bind<App>(Symbol.for('App')).to(App);
});

export interface IBootstrapReturn {
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const appConteiner = new Container();
	appConteiner.load(addBindings);
	const app = appConteiner.get<App>(Symbol.for('App'));
	await app.init();
	return { app };
}

bootstrap();
