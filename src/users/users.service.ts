import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import 'reflect-metadata';
import { IUsersRepository } from './users.repository.interface';
import { TYPES } from '../types';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({
		email,
		name,
		password,
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(
			existedUser.email,
			existedUser.name,
			existedUser.password,
		);
		return newUser.comparePassword(password);
	}
}

// https://github.com/AlariCode/4-nodejs-demo-3/blob/master/src/common/validate.middleware.ts
