import express, { Express } from 'express';
// import { userRouter } from './users/users';
import { Server } from 'http';
import { UserController } from './users/users.controller';

export class App {
	app: Express;
	server: Server;
	port: number;
	userController: UserController;

	constructor(userController: UserController) {
		this.app = express();
		this.port = 3000;
		this.userController = userController;
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	public async init() {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		console.log(`[APP] Server is online on port ${this.port}`);
	}
}
