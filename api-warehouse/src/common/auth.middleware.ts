import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {
		console.log('[AuthMiddleware activated]');
	}

	execute(req: Request, res: Response, next: NextFunction): void {
		console.log(
			`[AuthMiddleware] check headers.authorization --> ${req.headers.authorization}`,
		);
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			verify(token, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && typeof payload !== 'string') {
					req.user = payload.email;
					req.roles = payload.roles;
					console.log(
						`[AuthMiddleware] check ${payload.email} and ${payload.roles}`,
					);

					next();
				}
			});
		} else {
			next();
		}
	}
}
