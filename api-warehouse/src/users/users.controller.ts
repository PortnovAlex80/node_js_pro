import { BaseController } from '../common/base.controller';
import { Response, Request, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
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
	login(req: Request, res: Response, next: NextFunction) {
		//this.ok(res, 'Аутентификация пользователя');
		next(new HTTPError(403, 'Forbidden', 'CONTROLLER'));
	}
}
