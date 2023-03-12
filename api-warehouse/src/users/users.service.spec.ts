import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { IUserService } from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';
import 'reflect-metadata';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	findByEmail: jest.fn(),
	findByLogin: jest.fn(),
	create: jest.fn(),
};

const container = new Container();

let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UsersService);
	container
		.bind<IConfigService>(TYPES.ConfigService)
		.toConstantValue(ConfigServiceMock);
	container
		.bind<IUsersRepository>(TYPES.UsersRepository)
		.toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockResolvedValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				id: 1,
				login: user.login,
				password: user.password,
				firstName: user.name,
				lastName: 'string',
				email: 'string',
				role: 'string',
			}),
		);
		createdUser = await usersService.createUser({
			email: 'aa@aa.ru',
			name: 'Aaaa',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});

	it('validateUser - success', async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'aa',
			password: '1',
		});
		expect(res).toBeTruthy();
	});

	it('validateUser - wrong password', async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'aa',
			password: '2',
		});
		expect(res).toBeFalsy();
	});

	it('validateUser - ', async () => {
		usersRepository.findByEmail = jest.fn().mockReturnValueOnce(null);
		const res = await usersService.validateUser({
			email: 'aa2',
			password: '2',
		});
		expect(res).toBeFalsy();
	});
});
