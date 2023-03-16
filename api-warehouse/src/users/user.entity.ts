import { compare, hash } from 'bcryptjs';

export interface IUser {
	_login: string;
	_name: string;
	_email: string;
	_role: string;
}

export class User {
	private _password: string;
	private _login: string;
	private _name: string;
	private _email: string;
	private _role: string;

	constructor(user: IUser, passwordHash?: string) {
		this._login = user._login;
		this._email = user._email;
		this._name = user._name;
		this._role = user._role;

		if (passwordHash) {
			this._password = passwordHash;
		}
	}

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
