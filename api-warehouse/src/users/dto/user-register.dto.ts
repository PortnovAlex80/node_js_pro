import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Email is not valid' })
	email: string;

	@IsString({ message: `Password is empty` })
	password: string;

	@IsString({ message: `Name is empty` })
	name: string;
}
