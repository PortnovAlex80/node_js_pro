import { BaseController } from '../common/base.controller';
import { Response, Request, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { IUserController } from './interfaces/users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './interfaces/user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';
import { RoleMiddleware } from '../common/role.middleware';
import { UserRole } from '../roles/roles';
import 'reflect-metadata';
import { UserUpdateDto } from './dto/user-update.dto';
@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		const secret = this.configService.get('SECRET');
		const roleAdmin = new RoleMiddleware(UserRole.Admin, secret);
		const roleUser = new RoleMiddleware(UserRole.User, secret);
		const authGuard = new AuthGuard();
		const USER_PATH = '/users';
		this.bindRoutes([
			{
				path: USER_PATH,
				method: 'get',
				func: this.getUsers,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${USER_PATH}/:id`,
				method: 'get',
				func: this.getUserById,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${USER_PATH}/:id`,
				method: 'get',
				func: this.getUserById,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${USER_PATH}`,
				method: 'post',
				func: this.createUser,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${USER_PATH}/:id`,
				method: 'put',
				func: this.updateUser,
				middlewares: [
					new ValidateMiddleware(UserUpdateDto),
					authGuard,
					roleAdmin,
				],
			},
			{
				path: `${USER_PATH}`,
				method: 'delete',
				func: this.deleteUserByEmail,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${USER_PATH}/:id/roles`,
				method: 'get',
				func: this.getUserRolesById,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${USER_PATH}/:id/roles`,
				method: 'post',
				func: this.addRoleToUserById,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${USER_PATH}/:id/roles/:roleId`,
				method: 'delete',
				func: this.deleteRoleOfUserById,
				middlewares: [authGuard, roleAdmin],
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
				middlewares: [authGuard, roleAdmin],
			},
		]);
	}
	/**
	 * @swagger
	 * path:
	 *  /users:
	 *   get:
	 *    summary: Retrieve a list of users
	 *    tags: [Users]
	 *    responses:
	 *     "200":
	 *      description: A list of users
	 *      content:
	 *       application/json:
	 *        schema:
	 *         type: array
	 *         items:
	 *          $ref: '#/components/schemas/User'
	 */
	async getUsers(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const users = await this.userService.getUsers();
		if (!users) {
			return next(new HTTPError(404, `Пользователи не найдены в системе`));
		}
		const usersList = users?.map((user) => {
			const { password, ...rest } = user;
			return rest;
		});
		this.ok(res, usersList);
	}

	async getUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const id = req.params.id;
		if (isNaN(Number(id))) {
			return next(new HTTPError(400, `User ID is not correct`));
		}

		const user = await this.userService.getUsersById(Number(id));
		console.log(user);
		if (!user) {
			return next(new HTTPError(404, `Пользователь не найден в системе`));
		}

		const { password, ...result } = user;

		this.ok(res, result);
	}

	async createUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '3 Новый пользователь ');
	}

	async updateUser(
		{ body }: Request<{}, {}, UserUpdateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const email = body.email;
		const IsUserExist = await this.userService.getUserInfo(email);
		if (!IsUserExist) {
			return next(
				new HTTPError(404, `Пользователь с указанным email не существует`),
			);
		}
		const userDto = body;
		console.log(`[CONTROLLER] Body is exist - ${body.email}`);
		const updatedUser = await this.userService.updateUser(userDto);
		if (!updatedUser) {
			return next(new HTTPError(409, `Update error`));
		}
		this.ok(res, { email: updatedUser.email, id: updatedUser.id });
	}

	async deleteUserByEmail(
		{ body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const email = body.email;
		if (!email) {
			return next(new HTTPError(400, `User ID is not correct`));
		}
		const IsUserExist = await this.userService.getUserInfo(email);
		if (!IsUserExist) {
			return next(
				new HTTPError(404, `Пользователь с указанным email не существует`),
			);
		}
		const deletedUser = await this.userService.deleteUserByEmail(email);
		if (!deletedUser) {
			return next(new HTTPError(409, `Error`));
		}
		this.ok(res, { deletedUser });
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
					role: role,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{ algorithm: 'HS256' },
				(err, token) => {
					if (!token || err) {
						reject(err);
					} else {
						resolve(token);
					}
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
		if (!userInfo) {
			return next(new HTTPError(404, `Пользователь не найден в системе`));
		}
		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	}
}
