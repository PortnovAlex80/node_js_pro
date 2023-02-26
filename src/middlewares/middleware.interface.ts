import { NextFunction, Response, Request } from 'express';

export interface IMiddleware {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}
