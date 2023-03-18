import { NextFunction, Response, Request } from 'express';
export interface IUserController {
	getUsers: (req: Request, res: Response, next: NextFunction) => void;
	getUserById: (req: Request, res: Response, next: NextFunction) => void;
	createUser: (req: Request, res: Response, next: NextFunction) => void;
	updateUser: (req: Request, res: Response, next: NextFunction) => void;
	deleteUserByEmail: (req: Request, res: Response, next: NextFunction) => void;
	getUserRolesById: (req: Request, res: Response, next: NextFunction) => void;
	addRoleToUserById: (req: Request, res: Response, next: NextFunction) => void;
	deleteRoleOfUserById: (
		req: Request,
		res: Response,
		next: NextFunction,
	) => void;
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
	info: (req: Request, res: Response, next: NextFunction) => void;
}
