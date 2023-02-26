import { NextFunction, Response, Request } from 'express';
import { validate } from 'class-validator';
import { IMiddleware } from './middleware.interface';
import { WeatherRequestDto } from '../dto/weather.request.dto';
import { injectable, inject } from 'inversify';
import { ILogger } from '../services/logger.interface';
import { HTTPError } from '../exceptionhandlers/http-error';

@injectable()
export class ValidatorMiddleware implements IMiddleware {
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		console.log('Middleware');
		const city = new WeatherRequestDto();
		city.city = req.query.city as string;
		const errors = await validate(city);
		if (errors.length > 0) {
			next(new HTTPError(404, 'Query is not valid', 'WController'));
			res.status(404);
		} else {
			res.status(201);
			next();
		}
	}
}
