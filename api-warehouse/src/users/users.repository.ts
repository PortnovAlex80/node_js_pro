import { User as UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { UserEntity } from './user.entity';
import { IUsersRepository } from './interfaces/users.repository.interface';
import 'reflect-metadata';
import { UserUpdateDto } from './dto/user-update.dto';
@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {}

	async create(data: UserEntity): Promise<UserModel> {
		const { login, name, email, role, password } = data;
		const result = this.prismaService.client.user.create({
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
		return this.prismaService.client.user.findFirst({
			where: {
				email,
			},
		});
	}

	findByLogin(login: string): Promise<UserModel | null> {
		const result = this.prismaService.client.user.findFirst({
			where: {
				login,
			},
		});
		return result;
	}

	findAllUser(): Promise<UserModel[] | null> {
		return this.prismaService.client.user.findMany();
	}

	findUserById(id: number): Promise<UserModel | null> {
		return this.prismaService.client.user.findFirst({
			where: {
				id,
			},
		});
	}

	async updateUser(data: UserUpdateDto): Promise<UserModel | null> {
		const { login, name, email, role } = data;
		const existUser = await this.findByEmail(email);
		if (!existUser) {
			return null;
		}
		console.log(`Repo Service - ${email}`);
		if (!data.email) {
			return null;
		}
		return await this.prismaService.client.user.update({
			where: {
				email: data.email,
			},
			data: {
				firstName: name,
				login,
				role,
			},
		});
	}

	async deleteUserByEmail(email: string): Promise<UserModel | null> {
		const existUser = await this.findByEmail(email);
		if (!existUser) {
			return null;
		}
		const deleteUser = this.prismaService.client.user.delete({
			where: {
				email,
			},
		});
		return deleteUser;
	}
}
