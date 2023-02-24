import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './users.controller.interfaces';
import { HTTPError } from '../errors/http-error.class';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): void {
		console.log(req.body);
		next(new HTTPError(401, 'error auth', 'login'));
	}

	register(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): void {
		console.log(req.body);
		this.ok(res, 'register');
	}
}
