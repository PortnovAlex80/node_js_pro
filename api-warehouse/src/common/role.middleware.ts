import { NextFunction, Response, Request, Router } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify } from 'jsonwebtoken';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { HttpMethod, PERMISSIONS } from '../roles/permissions';
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
				const path = req.path;
				const method: HttpMethod = req.method.toLocaleLowerCase() as HttpMethod;
				const userRoles = decoded.roles;
				const permissionRoles = PERMISSIONS[path]?.[method] || [];
				const logns = PERMISSIONS['users/']['post'];
				console.log(logns);
				if (permissionRoles.includes(userRoles)) {
					next();
				} else {
					res.status(403).send('Access denied');
				}
			} catch (error) {
				res.status(403).send('Invalid token');
			}
		}
	}
}
