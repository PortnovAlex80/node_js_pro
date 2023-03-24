import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

const FAKE_USER = {
	email: 'john775@john.com',
	password: 'sdf',
};
const SUCCESS_USER = {
	email: 'product@john.com',
	password: 'asdf',
};

const UPDATE_USER = {
	email: 'john777@john.com',
	login: 'J2',
	name: 'Stallone',
	lastName: 'Jackson',
	role: 'admin',
};

const GOODS_1 = {
	name: 'Milk-powder',
	quantity: 1,
};

const GOODS_2 = {
	name: 'IPhone 7',
	quantity: 1,
};

beforeAll(async () => {
	await setTimeout(() => console.log('test pause'), 1500);
	const { app } = await boot;
	application = app;
});

describe('Registration e2e tests', () => {
	it('Register - ok', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: SUCCESS_USER.email,
			login: 'J1',
			name: 'John',
			lastName: 'Macferon',
			password: SUCCESS_USER.password,
			role: 'admin',
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

describe('Products CRUD - e2e tests', () => {
	it('Create product 1 - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		const res = await request(application.app)
			.post('/products')
			.set('Authorization', `Bearer ${login.body.jwt}`)
			.send(GOODS_1);
		expect(res.statusCode).toBe(200);
	});
	it('Create product 2 - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		const res = await request(application.app)
			.post('/products')
			.set('Authorization', `Bearer ${login.body.jwt}`)
			.send(GOODS_2);
		expect(res.statusCode).toBe(200);
	});

	it('Get all products - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		const res = await request(application.app)
			.get('/products')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.statusCode).toBe(200);
	});
	it('Get product GOOD1 - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		const res = await request(application.app)
			.post('/products/product')
			.set('Authorization', `Bearer ${login.body.jwt}`)
			.send(GOODS_1);
		expect(res.statusCode).toBe(200);
	});
	it('Get product GOOD1 - error', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		const res = await request(application.app)
			.post('/products/product')
			.set('Authorization', `Bearer 1`)
			.send(GOODS_1);
		expect(res.statusCode).toBe(401);
	});
	it('Update product GOOD1 - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		const { name } = GOODS_1;
		let { quantity } = GOODS_1;
		++quantity;
		const res = await request(application.app)
			.put('/products')
			.set('Authorization', `Bearer ${login.body.jwt}`)
			.send({
				name,
				quantity,
			});
		expect(res.statusCode).toBe(200);
	});
	it('DELETE product GOOD1 - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		const res = await request(application.app)
			.delete('/products')
			.set('Authorization', `Bearer ${login.body.jwt}`)
			.send(GOODS_1);
		expect(res.statusCode).toBe(200);
	});
	it('DELETE product GOOD2 - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		const res = await request(application.app)
			.delete('/products')
			.set('Authorization', `Bearer ${login.body.jwt}`)
			.send(GOODS_2);
		expect(res.statusCode).toBe(200);
	});
});

describe('Delete test user e2e tests', () => {
	it('Delete - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send(SUCCESS_USER);
		const res = await request(application.app)
			.delete('/users/users')
			.set('Authorization', `Bearer ${login.body.jwt}`)
			.send({
				email: SUCCESS_USER.email,
			});
		expect(res.statusCode).toBe(200);
	});
});

afterEach(async () => {
	await application.close();
});
