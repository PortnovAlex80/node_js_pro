import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { UserService } from './users/users.service';
import { IUserService } from './users/users.service.interface';
import { IUserController } from './users/users.controller.interfaces';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './users/users.repository';
import { IUsersRepository } from './users/users.repository.interface';

export interface IBootstrapReturn {
	appConteiner: Container;
	app: App;
}

export const appBingings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<App>(TYPES.Application).to(App);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository)
		.to(UsersRepository)
		.inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
	const appConteiner = new Container();
	appConteiner.load(appBingings);
	const app = appConteiner.get<App>(TYPES.Application);
	app.init();
	return { app, appConteiner };
}

export const { app, appConteiner } = bootstrap();
