import { NextFunction, Response, Request, Router } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify } from 'jsonwebtoken';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { HttpMethod, PERMISSIONS } from '../roles/permissions';
import { JwtPayload } from './jwt.payload.interface';
@injectable()
export class RoleMiddleware implements IMiddleware {
	constructor(private secret: string) {
		console.log('[RoleMiddleware activated]');
	}

	execute(req: Request, res: Response, next: NextFunction): void {
		const token = req.headers.authorization?.split(' ')[1];
		const path = req.path;
		console.log(path);
		if (path === '/users/login' || path === '/users/register') {
			return next();
		}
		if (!token) {
			res.status(401).send('Not authorized');
		} else {
			try {
				const decoded = verify(token, this.secret) as JwtPayload;

				const method: HttpMethod = req.method.toLocaleLowerCase() as HttpMethod;
				const userRoles = decoded.roles;
				console.log(`User roles - ${userRoles}`);
				console.log(`User path --- ${PERMISSIONS[path]}`);
				const permissionRoles = PERMISSIONS[path]?.[method] || [];
				permissionRoles.forEach((role) => {
					console.log(`User permission --- ${role}`);
				});

				if (
					permissionRoles.length === 0 ||
					permissionRoles.includes(userRoles)
				) {
					return next();
				} else {
					res.status(403).send('Access denied');
				}
			} catch (error) {
				console.log(this.secret);
				console.error(error);
				res.status(403).send('Invalid token');
			}
		}
	}
}
