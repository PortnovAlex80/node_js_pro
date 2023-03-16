import { IsEmail, IsString } from 'class-validator';
export class UserRegisterDto {
	@IsEmail({}, { message: 'Email is not valid' })
	email: string;
	@IsString({ message: `Password is empty` })
	password: string;
	@IsString({ message: `Name is empty` })
	name: string;
	@IsString()
	lastName?: string;
	@IsString({ message: `Login is empty` })
	login?: string;
	@IsString({ message: `Roles is empty` })
	role?: string;
}
