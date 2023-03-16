import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import 'reflect-metadata';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {}

	async create(data: User): Promise<UserModel> {
		const { login, name, email, role, password } = data;
		const result = this.prismaService.client.userModel.create({
			data: {
				login,
				password,
				firstName: name,
				lastName: name,
				email,
				role,
			},
		});
		return result;
	}

	async findByEmail(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}

	findByLogin(login: string): Promise<UserModel | null> {
		const result = this.prismaService.client.userModel.findFirst({
			where: {
				login,
			},
		});
		return result;
	}
}
