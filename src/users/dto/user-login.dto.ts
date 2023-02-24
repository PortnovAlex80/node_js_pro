import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Not email' })
	email: string;
	@IsString()
	password: string;
}
