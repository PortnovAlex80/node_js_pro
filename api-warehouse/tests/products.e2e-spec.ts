import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

const FAKE_USER = {
	email: 'john77@john.com',
	password: 'sdf',
};
const SUCCESS_USER = {
	email: 'john77@john.com',
	password: 'asdf',
};

const UPDATE_USER = {
	email: 'john777@john.com',
	login: 'J2',
	name: 'Stallone',
	lastName: 'Jackson',
	role: 'admin',
};

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Registration e2e tests', () => {
	it('Register - ok', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: SUCCESS_USER.email,
			login: 'J1',
			name: 'John',
			password: SUCCESS_USER.password,
		});
		expect(res.statusCode).toBe(200);
	});

	it('Register - error', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: SUCCESS_USER.email,
			login: 'J1',
			name: 'John',
			password: SUCCESS_USER.password,
		});
		expect(res.statusCode).toBe(409);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Login - error', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send(FAKE_USER);
		expect(res.statusCode).toBe(401);
	});
});
