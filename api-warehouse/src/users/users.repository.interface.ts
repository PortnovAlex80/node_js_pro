import { UserModel } from '@prisma/client';
import { User } from './user.entity';
export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	findByEmail: (email: string) => Promise<UserModel | null>;
	findByLogin: (email: string) => Promise<UserModel | null>;
}
