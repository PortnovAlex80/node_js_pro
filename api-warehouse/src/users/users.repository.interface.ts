import { User } from '@prisma/client';
import { UserEntity } from './user.entity';

export interface IUsersRepository {
	create: (user: UserEntity) => Promise<User>;
	findByEmail: (email: string) => Promise<User | null>;
	findByLogin: (email: string) => Promise<User | null>;
}
