import { Container } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { LoggerService } from './logger/logger';
import { IExceptionFilter } from './errors/exception.filter.interface';

// async function bootstrap() {
// 	const appContainer = new Container();
// 	appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
// 	appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
// 	appContainer.bind<UserController>(TYPES.UserController).to(UserController);
// 	appContainer.bind<App>(TYPES.Application).to(App);
// 	const app = appContainer.get<App>(TYPES.Application);
// 	await app.init();
// }

// bootstrap();

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);
const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app };
