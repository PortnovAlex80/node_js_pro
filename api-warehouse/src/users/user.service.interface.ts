import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

export interface IUserService {
	// | **№** | **Path**                   | **Method** | **Body**  | **Response**              | **Description**                                |
	// |-------|----------------------------|------------|-----------|---------------------------|------------------------------------------------|
	// | 1     | /users                     | GET        | -         | Список пользователей      | Получить список всех пользователей             |
	//	getUsers: (req: Request, res: Response, next: NextFunction) => User | null;
	// | 2     | /users/{id}                | GET        | -         | Информация о пользователе | Получить информацию о конкретном пользователе  |
	//	getUserById: (req: Request, res: Response, next: NextFunction) => void;
	// | 3     | /users                     | POST       | User data | Новый пользователь        | Создать нового пользователя                    |
	createUser: (dto: UserRegisterDto) => Promise<User | null>;
	// | 4     | /users/{id}                | PUT        | User data | Обновленный пользователь  | Обновить информацию о пользователе             |
	//	updateUserById: (req: Request, res: Response, next: NextFunction) => void;
	// | 5     | /users/{id}                | DELETE     | -         | -                         | Удалить пользователя                           |
	//	deleteUserById: (req: Request, res: Response, next: NextFunction) => void;
	// | 6     | /users/{id}/roles          | GET        | -         | Список ролей пользователя | Получить список ролей пользователя             |
	//	getUserRolesById: (req: Request, res: Response, next: NextFunction) => void;
	// | 7     | /users/{id}/roles          | POST       | Role data | -                         | Добавить роль пользователю                     |
	//	addRoleToUserById: (req: Request, res: Response, next: NextFunction) => void;
	// | 8     | /users/{id}/roles/{roleId} | DELETE     | -         | -                         | Удалить роль у пользователя                    |
	//	deleteRoleOfUserById: (req: Request, res: Response, next: NextFunction) => void;
	// | 9     | /login                     | POST       | User creds | Jwt token                | Аутентификация пользователя                    |
	//	login: (req: Request, res: Response, next: NextFunction) => void;
	//	register: (req: Request, res: Response, next: NextFunction) => void;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<User | null>;
	getUserRole: (email: string) => Promise<string | null>;
}
