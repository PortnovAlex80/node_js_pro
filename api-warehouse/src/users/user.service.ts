import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService)
		private configService: IConfigService,
		@inject(TYPES.UsersRepository)
		private userRepository: IUsersRepository,
	) {}

	async createUser({
		email,
		password,
		name,
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User('MyLogin', name, email, 'admin');
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.userRepository.findByEmail(email);
		if (existedUser) {
			return null;
		}
		return this.userRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existUser = await this.userRepository.findByEmail(email);
		if (!existUser) {
			return false;
		}
		const newUser = new User('MyLogin', 'name', email, 'user');

		return true;
	}
}
