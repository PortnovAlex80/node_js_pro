import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		// private readonly _ID: number,
		private readonly _login: string,
		private readonly _name: string,
		private readonly _email: string,
		private readonly _role: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	// get ID(): number {
	// 	return this._ID;
	// }

	get login(): string {
		return this._login;
	}

	get name(): string {
		return this._name;
	}

	get email(): string {
		return this._email;
	}

	get role(): string {
		return this._role;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return await compare(pass, this._password);
	}
}

// ##### User data
// ```json
// {
//   "name": "John Doe",
//   "email": "johndoe@example.com",
//   "password": "password123",
//   "role": "User"
// }
// ```

// #### Users
// | **1** | **Атрибут** | **Описание**                             |
// |-------|-------------|-------------------------------------------|
// | 2     | ID          | Уникальный идентификатор пользователя     |
// | 3 | Login       | Логин пользователя для входа в систему    |
// | 4 | Password    | Пароль пользователя для входа в систему   |
// | 5 | Email       | Электронная почта пользователя для связи  |
// | 6 | FullName    | Полное имя пользователя                   |
// | 7 | RoleID      | Идентификатор роли пользователя в системе |

// #### Roles
// | **1** | **Атрибут** | **Описание**                               |
// |-------|-------------|---------------------------------------------|
// | 2     | ID          | Уникальный идентификатор роли               |
// | 3 | Name        | Название роли                               |
// | 4 | Permissions | Список разрешений, связанных с данной ролью |
