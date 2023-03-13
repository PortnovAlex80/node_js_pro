import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService as IUsersService } from './user.service.interface';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';
import { UserRole } from '../roles/roles';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.ConfigService)
		private configService: IConfigService,
		@inject(TYPES.UsersRepository)
		private usersRepository: IUsersRepository,
	) {}

	async createUser({
		email,
		password,
		name,
		login,
		role,
	}: UserRegisterDto): Promise<UserModel | null> {
		if (!login) {
			login = '';
		}
		if (!role) {
			role = 'user';
		}
		const newUser = new User(login, name, email, role);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.findByEmail(email);
		if (existedUser) {
			console.log('[USER SERVICE] User exist');
			return null;
		}
		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existUser = await this.usersRepository.findByEmail(email);
		if (!existUser) {
			return false;
		}
		const newUser = new User(
			existUser.login,
			existUser.firstName,
			existUser.email,
			existUser.role,
			existUser.password,
		);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.findByEmail(email);
	}

	async getUserRole(email: string): Promise<string | null> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			return null;
		}
		return user.role;
	}
}
