import { NextFunction, Response, Request, Router } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify } from 'jsonwebtoken';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { PERMISSIONS } from '../roles/permissions';
import { JwtPayload } from './jwt.payload.interface';

@injectable()
export class RoleMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			res.status(401).send('Not authorized');
		} else {
			try {
				console.log('try');
				const decoded = verify(token, this.secret) as JwtPayload;
				const { method, path } = req;
				const userRoles = decoded.roles;
				if (!method) {
					next();
				}
				const permissionRoles = PERMISSIONS[path];
				const met = permissionRoles?[method];
				// if (permissionRoles.includes(userRoles)) {
				// 	return next();
				// }
				return next();
			} catch (error) {
				res.status(403).send('Invalid token Access denied');
			}
		}
	}
}

interface IMethods {
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
}
/*
export class AuthMiddleware implements IMiddleware {
	 {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			verify(token, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && typeof payload !== 'string') {
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}

*/
