import { User as UserModel } from '@prisma/client';
import { NextFunction } from 'express';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

export interface IUserService {
	getUsers: () => Promise<UserModel[] | null>;
	getUsersById: (id: number) => Promise<UserModel | null>;
	//	getUserById: (req: Request, res: Response, next: NextFunction) => void;
	//	updateUserById: (req: Request, res: Response, next: NextFunction) => void;
	//	deleteUserById: (req: Request, res: Response, next: NextFunction) => void;
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
