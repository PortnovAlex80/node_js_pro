import { NextFunction, Response, Request } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify } from 'jsonwebtoken';

const UNAUTHORIZED_STATUS = 401;
const FORBIDDEN_STATUS = 403;
const NOT_AUTHORIZED_MESSAGE = 'Not authorized';
const ACCESS_DENIED_MESSAGE = 'Access denied';
const INVALID_TOKEN_MESSAGE = 'Invalid token';
export class RoleMiddleware implements IMiddleware {
	constructor(private role: string, private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			res.status(UNAUTHORIZED_STATUS).send(NOT_AUTHORIZED_MESSAGE);
		} else {
			try {
				const payload = verify(token, this.secret);
				if (payload && typeof payload !== 'string') {
					const access: boolean = payload.role.includes(this.role);
					if (!access) {
						res.status(FORBIDDEN_STATUS).send(ACCESS_DENIED_MESSAGE);
					} else {
						next();
					}
				}
			} catch (error) {
				res.status(FORBIDDEN_STATUS).send(INVALID_TOKEN_MESSAGE);
			}
		}
	}
}
