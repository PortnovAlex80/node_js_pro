import { IsEmail, IsString } from 'class-validator';
export class UserUpdateDto {
	@IsEmail({}, { message: 'Email is not valid' })
	email: string;
	@IsString({ message: `Name is empty` })
	name?: string;
	@IsString()
	lastName?: string;
	@IsString({ message: `Login is empty` })
	login?: string;
	@IsString({ message: `Roles is empty` })
	role?: string;
}
