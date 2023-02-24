import { Container } from "inversify";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";
import { IExceptionFilter } from "./errors/exception.filter.interface";

    const appConteiner = new Container();
    appConteiner.bind<ILogger>(TYPES.ILogger).to(LoggerService);
    appConteiner.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    appConteiner.bind<UserController>(TYPES.UserController).to(UserController);
    appConteiner.bind<App>(TYPES.Application).to(App);
    const app = appConteiner.get<App>(TYPES.Application);
    app.init();

    export { app, appConteiner }