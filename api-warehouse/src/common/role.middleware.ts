import { NextFunction, Response, Request } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify } from 'jsonwebtoken';
export class RoleMiddleware implements IMiddleware {
	constructor(private roles: string, private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			res.status(401).send('Not authorized');
		} else {
			try {
				const payload = verify(token, this.secret);
				if (payload && typeof payload !== 'string') {
					const access: boolean = payload.roles.includes(this.roles);
					if (!access) {
						res.status(403).send('Access denied');
					} else {
						next();
					}
				}
			} catch (error) {
				res.status(403).send('Invalid token');
			}
		}
	}
}
