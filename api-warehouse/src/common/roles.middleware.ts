import { NextFunction, Response, Request, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export class RolesMiddleware implements IMiddleware {

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = 1;
	}

}



export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middlewares?: IMiddleware[];
}