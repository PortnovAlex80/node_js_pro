import express, { Express } from 'express';
import { Server } from 'http';
import { weatherRouter } from './controller/weather.controller';
import { ExceptionFilter } from './exceptionhandlers/exception.filter';
import { ILogger } from './services/logger.interface';
import { LoggerService } from './services/logger.service';

export class App {
	server: Server;
	app: Express;
	port: Number;
	logger: LoggerService;
	exceptionFilter: ExceptionFilter;

	constructor(logger: ILogger, exceptionFilter: ExceptionFilter) {
		this.app = express();
		this.port = 3000;
		this.logger = logger;
		this.exceptionFilter = exceptionFilter;
	}

	//	useMiddleware(): void {}

	useRoutes(): void {
		this.app.use(weatherRouter);
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
