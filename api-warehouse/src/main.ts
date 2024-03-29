import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IUserController } from './users/interfaces/users.controller.interface';
import { LoggerService } from './logger/logger';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserService } from './users//interfaces/user.service.interface';
import { UsersService } from './users/user.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/interfaces/users.repository.interface';
import { UsersRepository } from './users/users.repository';
import { IProductsController } from './products/products.interfaces/products.controller.interface';
import { ProductsController } from './products/products.controller';
import { IProductsService } from './products/products.interfaces/products.service.interface';
import { ProductsService } from './products/products.service';
import { IProductsRepository } from './products/products.interfaces/products.repository.interface';
import { ProductsRepository } from './products/products.repository';
import { TelegramBotApp } from './bot/bot.connector';
import { ProductListScene } from './bot/context/scenes/products.list.scene';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter)
		.to(ExceptionFilter)
		.inSingletonScope();
	bind<IUserController>(TYPES.UserController)
		.to(UserController)
		.inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UsersService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService)
		.to(ConfigService)
		.inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository)
		.to(UsersRepository)
		.inSingletonScope();
	bind<IProductsController>(TYPES.ProductsController)
		.to(ProductsController)
		.inSingletonScope();
	bind<IProductsService>(TYPES.ProductsService)
		.to(ProductsService)
		.inSingletonScope();
	bind<IProductsRepository>(TYPES.ProductsRepository)
		.to(ProductsRepository)
		.inSingletonScope();
	bind<TelegramBotApp>(TYPES.TelegramBotApp)
		.to(TelegramBotApp)
		.inSingletonScope();

	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
