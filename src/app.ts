import express, { Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: ILogger;
    userController: UserController;
    exceptionFilter: ExceptionFilter;

    constructor(
        logger: ILogger,
        userController: UserController,
        exceptionFilter: ExceptionFilter
        ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    };

    useRoutes() {
        this.app.use('/users', this.userController.router)
    }

    userExceptionFilters() {
this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init() {
        this.useRoutes();
        this.userExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server is online on ${this.port}`)

    }
}