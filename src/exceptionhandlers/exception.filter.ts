import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../services/logger.service';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error';

export class ExceptionFilter implements IExceptionFilter {
	logger: LoggerService;
	constructor(logger: LoggerService) {
		this.logger = logger;
	}
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Error ${err.statusCode}`);
		} else {
			this.logger.error(`[${err.message}]`);
			res.status(500).send({ err: err.message });
		}
	}
}
