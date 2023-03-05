import { BaseController } from '../common/base.controller';
import { Response, Request, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/users', method: 'get', func: this.getUsers },
			{ path: '/users/:id', method: 'get', func: this.getUserById },
			{ path: '/users', method: 'post', func: this.createUser },
			{ path: '/users/:id', method: 'put', func: this.updateUserById },
			{ path: '/users/:id', method: 'delete', func: this.deleteUserById },
			{ path: '/users/:id/roles', method: 'get', func: this.getUserRolesById },
			{ path: '/users/:id/roles', method: 'post', func: this.addRoleToUserById },
			{ path: '/users/:id/roles/:roleId', method: 'delete', func: this.deleteRoleOfUserById },
			{ path: '/login', method: 'post', func: this.login },
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}
	// | **№** | **Path**                   | **Method** | **Body**  | **Response**              | **Description**                                |
	// |-------|----------------------------|------------|-----------|---------------------------|------------------------------------------------|
	// | 1     | /users                     | GET        | -         | Список пользователей      | Получить список всех пользователей             |
	getUsers(req: Request, res: Response, next: NextFunction) {
		this.ok(res, '1 Список пользователей ');
	}
	// | 2     | /users/{id}                | GET        | -         | Информация о пользователе | Получить информацию о конкретном пользователе  |
	getUserById(req: Request, res: Response, next: NextFunction) {
		this.ok(res, '2 Информация о пользователе');
	}
	// | 3     | /users                     | POST       | User data | Новый пользователь        | Создать нового пользователя                    |
	createUser(req: Request, res: Response, next: NextFunction) {
		this.ok(res, '3 Новый пользователь ');
	}
	// | 4     | /users/{id}                | PUT        | User data | Обновленный пользователь  | Обновить информацию о пользователе             |
	updateUserById(req: Request, res: Response, next: NextFunction) {
		this.ok(res, '4 Обновленный пользователь ');
	}
	// | 5     | /users/{id}                | DELETE     | -         | -                         | Удалить пользователя                           |
	deleteUserById(req: Request, res: Response, next: NextFunction) {
		this.ok(res, '5 Удалить пользователя ');
	}
	// | 6     | /users/{id}/roles          | GET        | -         | Список ролей пользователя | Получить список ролей пользователя             |
	getUserRolesById(req: Request, res: Response, next: NextFunction) {
		this.ok(res, '6 писок ролей пользователя');
	}
	// | 7     | /users/{id}/roles          | POST       | Role data | -                         | Добавить роль пользователю                     |
	addRoleToUserById(req: Request, res: Response, next: NextFunction) {
		this.ok(res, '7 Добавить роль пользователю ');
	}
	// | 8     | /users/{id}/roles/{roleId} | DELETE     | -         | -                         | Удалить роль у пользователя                    |
	deleteRoleOfUserById(req: Request, res: Response, next: NextFunction) {
		this.ok(res, '8 Удалить роль у пользователя ');
	}
	// | 9     | /login                     | POST       | User creds | Jwt token                | Аутентификация пользователя                    |
	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		//this.ok(res, 'Аутентификация пользователя');
		console.log(req.body);
		next(new HTTPError(401, 'Forbidden', 'CONTROLLER'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		//this.ok(res, 'Аутентификация пользователя');
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(409, `Пользователь с указанным email уже существует `));
		}

		this.ok(res, { email: result.email });
	}
}
