import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../services/logger.interface';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {
		this.logger = logger;
	}
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err?.context}] HTTP Error ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`[${err.message}]`);
			res.status(500).send({ err: err.message });
		}
	}
}
