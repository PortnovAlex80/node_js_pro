import { NextFunction, Response, Request, Router } from 'express';
import { IMiddleware } from './middleware.interface';
import { Jwt } from 'jsonwebtoken';
import { HTTPError } from '../errors/http-error.class';
import { verify } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { PERMISSIONS } from '../roles/permissions';
import { JwtPayLoad } from './jwt.payload.interface';

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
				const decoded = verify(token, this.secret) as JwtPayLoad;
				const { method, path } = req;
				const userRoles = decoded.roles;
				const permissionRoles = PERMISSIONS;
				// if (permissionRoles.length === 0) {
				// 	next();
				// 	return;
				// }
				if (permissionRoles.includes(userRoles)) {
					next();
				}
				next();
			} catch (error) {
				res.status(403).send('Invalid token Access denied');
			}
		}
	}
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
