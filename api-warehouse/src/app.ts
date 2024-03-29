import { json } from 'body-parser';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import 'reflect-metadata';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';
import { ProductsController } from './products/products.controller';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { TelegramBotApp } from './bot/bot.connector';
import cors from 'cors';
import { ProductsService } from './products/products.service';

export const pathRouteExtension = '/users';
@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController)
		private userController: UserController,
		@inject(TYPES.ExceptionFilter)
		private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService)
		private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ProductsController)
		private productsController: ProductsController,
		@inject(TYPES.ProductsService)
		private productsService: ProductsService,
	) {
		this.app = express();
		this.port = Number(this.configService.get('PORT'));
	}

	useMiddleware(): void {
		this.app.use(json());
		const secret = this.configService.get('SECRET');
		const authMiddleware = new AuthMiddleware(secret);
		this.app.use(authMiddleware.execute.bind(authMiddleware));
		const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
		this.app.use(
			'/api-docs',
			swaggerUi.serve,
			swaggerUi.setup(swaggerDocument),
		);
	}

	useRoutes() {
		this.app.use(pathRouteExtension, this.userController.router);
		this.app.use('', this.productsController.router);
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init() {
		this.app.use(cors());
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`[APP] Server is online on port ${this.port}`);
		await new TelegramBotApp(
			this.logger,
			this.configService,
			this.productsService,
		);
	}

	public close(): void {
		this.server.close();
	}
}
