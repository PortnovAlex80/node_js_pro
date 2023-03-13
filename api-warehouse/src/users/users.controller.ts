import { BaseController } from '../common/base.controller';
import { Response, Request, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';
import { JwtPayload } from '../common/jwt.payload.interface';
import { RoleMiddleware } from '../common/role.middleware';
import { UserRole } from '../roles/roles';
import 'reflect-metadata';
@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/users', method: 'get', func: this.getUsers },
			{ path: '/users/:id', method: 'get', func: this.getUserById },
			{ path: '/users', method: 'post', func: this.createUser },
			{ path: '/users/:id', method: 'put', func: this.updateUserById },
			{ path: '/users/:id', method: 'delete', func: this.deleteUserById },
			{ path: '/users/:id/roles', method: 'get', func: this.getUserRolesById },
			{
				path: '/users/:id/roles',
				method: 'post',
				func: this.addRoleToUserById,
			},
			{
				path: '/users/:id/roles/:roleId',
				method: 'delete',
				func: this.deleteRoleOfUserById,
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [
					new AuthGuard(),
					new RoleMiddleware(UserRole.Admin, this.configService.get('SECRET')),
				],
			},
		]);
	}

	async getUsers(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '1 Список пользователей ');
	}

	async getUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '2 Информация о пользователе');
	}

	async createUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '3 Новый пользователь ');
	}

	async updateUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '4 Обновленный пользователь ');
	}

	async deleteUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '5 Удалить пользователя ');
	}

	async getUserRolesById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '6 писок ролей пользователя');
	}

	async addRoleToUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '7 Добавить роль пользователю ');
	}

	async deleteRoleOfUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '8 Удалить роль у пользователя ');
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, 'Forbidden', 'CONTROLLER'));
		} else {
			const role = (await this.userService.getUserRole(req.body.email)) || '';
			const jwt = await this.signJWT(
				req.body.email,
				this.configService.get('SECRET'),
				role,
			);
			this.ok(res, { jwt });
		}
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(
				new HTTPError(409, `Пользователь с указанным email уже существует `),
			);
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	private signJWT(
		email: string,
		secret: string,
		role: string,
	): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					roles: role,
					iat: Math.floor(Date.now() / 1000),
				} as JwtPayload,
				secret,
				{ algorithm: 'HS256' },
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}

	async info(
		{ user }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	}
}
