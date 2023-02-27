import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { WeatherController } from './controller/weather.controller';
import { ExceptionFilter } from './exceptionhandlers/exception.filter';
import { ILogger } from './services/logger.interface';
import 'reflect-metadata';

@injectable()
export class App {
	server: Server;
	app: Express;
	port: Number;

	constructor(
		@inject(Symbol.for('ILogger')) private logger: ILogger,
		@inject(Symbol.for('IExceptionFilter')) private exceptionFilter: ExceptionFilter,
		@inject(Symbol.for('WeatherController')) private weatherController: WeatherController,
	) {
		this.app = express();
		this.port = 3000;
	}

	useRoutes(): void {
		this.app.use(this.weatherController.getRouter());
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
