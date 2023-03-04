import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { User } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
	createUser({ email, password, name }: UserRegisterDto): User | null {
		return null;
	}

	validateUser(dto: UserLoginDto): boolean {
		return true;
	}
}
