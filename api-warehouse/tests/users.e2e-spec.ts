import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Authorizations e2e tests', () => {
	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'john9@john.com', password: 'asdf' });
		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Login - error', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'john5@john.com', password: '1' });
		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'john5@john.com', password: 'asdf' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.body.email).toBe('john5@john.com');
	});

	it('Info - error', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer 1`);
		expect(res.statusCode).toBe(401);
	});
});

describe('CRUD Users e2e tests', () => {
	it('Register - error', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: 'john7@john.com',
			login: 'J1',
			name: 'John',
			password: 'asdf',
		});
		expect(res.statusCode).toBe(409);
	});

	it('GET users without token - error', async () => {
		const res = await request(application.app).get('/users/users');
		expect(res.statusCode).toBe(401);
	});

	it('GET users token - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'john5@john.com', password: 'asdf' });
		const res = await request(application.app)
			.get('/users/users')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.statusCode).toBe(200);
	});

	it('GET users/:id without token - error', async () => {
		const res = await request(application.app).get('/users/users/5');
		expect(res.statusCode).toBe(401);
	});

	it('GET users/:id token - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'john5@john.com', password: 'asdf' });
		const res = await request(application.app)
			.get('/users/users/5')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.statusCode).toBe(200);
	});

	it('PUT users/:id without token - error', async () => {
		const res = await request(application.app).get('/users/users/5');
		expect(res.statusCode).toBe(401);
	});

	it('PUT users/:id token - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'john5@john.com', password: 'asdf' });
		const res = await request(application.app)
			.get('/users/users/5')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.statusCode).toBe(200);
	});

	it('GET users/:id/roles without token - error', async () => {
		const res = await request(application.app).get('/users/users/5/roles');
		expect(res.statusCode).toBe(401);
	});

	it('GET users/:id/roles token - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'john5@john.com', password: 'asdf' });
		const res = await request(application.app)
			.get('/users/users/5/roles')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.statusCode).toBe(200);
	});

	it('POST users/:id/roles without token - error', async () => {
		const res = await request(application.app).post('/users/users/5/roles');
		expect(res.statusCode).toBe(401);
	});

	it('POST users/:id/roles token - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'john5@john.com', password: 'asdf' });
		const res = await request(application.app)
			.post('/users/users/5/roles')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.statusCode).toBe(200);
	});

	it('DELETE users/:id/roles without token - error', async () => {
		const res = await request(application.app).delete(
			'/users/users/5/roles/admin',
		);
		expect(res.statusCode).toBe(401);
	});

	it('DELETE users/:id/roles token - ok', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'john5@john.com', password: 'asdf' });
		const res = await request(application.app)
			.delete('/users/users/5/roles/admin')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.statusCode).toBe(200);
	});
});

afterAll(() => {
	application.close();
});

/*
# | **№** | **Path**                   | **Method** | **Body**  | **Response**              | **Description**                                |
# |-------|----------------------------|------------|-----------|---------------------------|------------------------------------------------|
# | 1     | /users                     | GET        | -         | Список пользователей      | Получить список всех пользователей             |
# | 2     | /users/{id}                | GET        | -         | Информация о пользователе | Получить информацию о конкретном пользователе  |
# | 3     | /users                     | POST       | User data | Новый пользователь        | Создать нового пользователя                    |
# | 4     | /users/{id}                | PUT        | User data | Обновленный пользователь  | Обновить информацию о пользователе             |
# | 5     | /users/{id}                | DELETE     | -         | -                         | Удалить пользователя                           |
# | 6     | /users/{id}/roles          | GET        | -         | Список ролей пользователя | Получить список ролей пользователя             |
# | 7     | /users/{id}/roles          | POST       | Role data | -                         | Добавить роль пользователю                     |
# | 8     | /users/{id}/roles/{roleId} | DELETE     | -         | -                         | Удалить роль у пользователя                    |
# | 9     | /login                     | POST       | User creds | Jwt token                | Аутентификация пользователя                    |
*/
