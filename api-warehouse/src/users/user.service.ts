import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService as IUsersService } from './user.service.interface';
import { UserEntity, IUserEntity } from './user.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { User as UserModel } from '@prisma/client';
import { NextFunction } from 'express';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.ConfigService)
		private configService: IConfigService,
		@inject(TYPES.UsersRepository)
		private usersRepository: IUsersRepository,
	) {}

	async createUser(dto: UserRegisterDto): Promise<UserModel | null> {
		const { email, password, name, login = '', role = 'user' } = dto;
		const user: IUserEntity = {
			_login: login,
			_name: name,
			_email: email,
			_role: role,
		};
		const newUser = new UserEntity(user);
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
		const newUser = new UserEntity(
			{
				_login: existUser.login,
				_name: existUser.firstName,
				_email: existUser.email,
				_role: existUser.role,
			},
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
	async getUsers(): Promise<UserModel[] | null> {
		const users = await this.usersRepository.findAllUser();
		return users;
	}
	async getUsersById(id: number): Promise<UserModel | null> {
		const user = await this.usersRepository.findUserById(id);
		if (!user) {
			return null;
		}
		return user;
	}
}
