import express, { Express } from 'express';
import { Server } from 'http';
import { json } from 'body-parser';
import { weatherRouter } from './controller/weather.controller';

export class App {
	server: Server;
	app: Express;
	port: Number;

	constructor() {
		this.app = express();
		this.port = 3000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use(weatherRouter);
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		console.log(`Сервер запущен на http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
