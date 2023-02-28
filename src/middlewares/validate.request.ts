import { NextFunction, Response, Request } from 'express';
import { validate } from 'class-validator';
import { IMiddleware } from './middleware.interface';
import { WeatherRequestDto } from '../dto/weather.request.dto';
import { injectable } from 'inversify';
import { HTTPError } from '../exceptionhandlers/http-error';

@injectable()
export class ValidatorMiddleware implements IMiddleware {
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		const city = new WeatherRequestDto();
		city.city = req.query.city as string;
		const errors = await validate(city);
		if (errors.length > 0) {
			//next(new HTTPError(404, 'Query is not valid', '[Controller]'));
			res.status(404).send('Query is not valid');
		} else {
			next();
		}
	}
}
