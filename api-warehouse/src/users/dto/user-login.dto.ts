import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Email is not valid' })
	email: string;

	@IsString({ message: `Password is empty` })
	password: string;
}
