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

// предложение по улучшению от бота
import { NextFunction, Response, Request } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify, JwtPayload } from 'jsonwebtoken';

const UNAUTHORIZED_STATUS = 401;
const FORBIDDEN_STATUS = 403;
const NOT_AUTHORIZED_MESSAGE = 'Not authorized';
const ACCESS_DENIED_MESSAGE = 'Access denied';
const INVALID_TOKEN_MESSAGE = 'Invalid token';

export class RoleMiddleware implements IMiddleware {
  constructor(private roles: string, private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(UNAUTHORIZED_STATUS).send(NOT_AUTHORIZED_MESSAGE);
      return;
    }

    try {
      const payload = verify(token, this.secret);

      if (isJwtPayload(payload)) {
        const access: boolean = payload.roles.includes(this.roles);
        if (!access) {
          res.status(FORBIDDEN_STATUS).send(ACCESS_DENIED_MESSAGE);
        } else {
          next();
        }
      } else {
        res.status(FORBIDDEN_STATUS).send(INVALID_TOKEN_MESSAGE);
      }
    } catch (error) {
      res.status(FORBIDDEN_STATUS).send(INVALID_TOKEN_MESSAGE);
    }
  }
}

function isJwtPayload(payload: unknown): payload is JwtPayload {
  return (
    payload !== null &&
    typeof payload === 'object' &&
    'roles' in payload &&
    Array.isArray(payload.roles)
  );
}

