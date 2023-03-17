import { User as UserModel } from '@prisma/client';
import { UserEntity } from './user.entity';
export interface IUsersRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	findByEmail: (email: string) => Promise<UserModel | null>;
	findByLogin: (email: string) => Promise<UserModel | null>;
	findAllUser: () => Promise<UserModel[] | null>;
	findUserById: (id: number) => Promise<UserModel | null>;
	updateUser: (user: UserEntity) => Promise<UserModel | null>;
}
