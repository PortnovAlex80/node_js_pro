import { NextFunction, Response, Request } from 'express';
import { validate } from 'class-validator';
import { IMiddleware } from './middleware.interface';
import { WeatherRequestDto } from '../dto/weather.request.dto';

export class ValidatorMiddleware implements IMiddleware {
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		console.log('Middleware');
		const city = new WeatherRequestDto();
		city.city = req.query.city as string;
		const errors = await validate(city);
		if (errors.length > 0) {
			res.status(404).send(errors);
		} else {
			next();
		}
	}
}
