import express, { Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import { injectable, inject } from 'inversify';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import 'reflect-metadata';

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;
    
    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
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