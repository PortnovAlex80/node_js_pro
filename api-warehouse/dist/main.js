"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.bootstrap = exports.appBindings = void 0;
const inversify_1 = require("inversify");
const app_1 = require("./app");
const exception_filter_1 = require("./errors/exception.filter");
const types_1 = require("./types");
const users_controller_1 = require("./users/users.controller");
const logger_1 = require("./logger/logger");
const user_service_1 = require("./users/user.service");
const config_service_1 = require("./config/config.service");
const prisma_service_1 = require("./database/prisma.service");
const users_repository_1 = require("./users/users.repository");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilter).inSingletonScope();
    bind(types_1.TYPES.UserController).to(users_controller_1.UserController).inSingletonScope();
    bind(types_1.TYPES.UserService).to(user_service_1.UserService).inSingletonScope();
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.PrismaService).to(prisma_service_1.PrismaService).inSingletonScope();
    bind(types_1.TYPES.UsersRepository).to(users_repository_1.UsersRepository).inSingletonScope();
    bind(types_1.TYPES.Application).to(app_1.App).inSingletonScope();
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { app };
}
exports.bootstrap = bootstrap;
exports.app = bootstrap().app;
//# sourceMappingURL=main.js.map