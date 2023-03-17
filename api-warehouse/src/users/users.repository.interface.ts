import { UserModel } from '@prisma/client';
import { UserEntity } from './user.entity';
export interface IUsersRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	findByEmail: (email: string) => Promise<UserModel | null>;
	findByLogin: (email: string) => Promise<UserModel | null>;
}
