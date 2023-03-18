import { User as UserModel } from '@prisma/client';
import { NextFunction } from 'express';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserEntity } from '../user.entity';

export interface IUserService {
	getUsers: () => Promise<UserModel[] | null>;
	getUsersById: (id: number) => Promise<UserModel | null>;
	updateUser: (user: UserUpdateDto) => Promise<UserModel | null>;
	deleteUserByEmail: (email: string) => Promise<boolean>;
	//	getUserRolesById: (req: Request, res: Response, next: NextFunction) => void;
	//	addRoleToUserById: (req: Request, res: Response, next: NextFunction) => void;
	//	deleteRoleOfUserById: (req: Request, res: Response, next: NextFunction) => void;
	//	login: (req: Request, res: Response, next: NextFunction) => void;
	//	register: (req: Request, res: Response, next: NextFunction) => void;
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
	getUserRole: (email: string) => Promise<string | null>;
}
