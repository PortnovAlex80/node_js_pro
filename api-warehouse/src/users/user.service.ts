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
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User('MyLogin', name, email, 'admin');
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.findByEmail(email);
		if (existedUser) {
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
			'MyLogin',
			'name',
			existUser.email,
			'user',
			existUser.password,
		);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.findByEmail(email);
	}
}
