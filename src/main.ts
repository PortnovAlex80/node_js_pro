import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";
import { IExceptionFilter } from "./errors/exception.filter.interface";


export const appBingings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    bind<UserController>(TYPES.UserController).to(UserController);
    bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
        const appConteiner = new Container();
        appConteiner.load(appBingings);
            const app = appConteiner.get<App>(TYPES.Application);
    app.init();
    return { app, appConteiner };

}

export const { app, appConteiner } = bootstrap();