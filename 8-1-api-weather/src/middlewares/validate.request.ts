import { NextFunction, Response, Request } from 'express';
import { validate } from 'class-validator';
import { IMiddleware } from './middleware.interface';
import { WeatherRequestDto } from '../dto/weather.request.dto';
import { injectable, inject } from 'inversify';
import { ILogger } from '../services/logger.interface';

@injectable()
export class ValidatorMiddleware implements IMiddleware {
	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		const city = new WeatherRequestDto();
		city.city = req.query.city as string;
		const errors = await validate(city);
		if (errors.length > 0) {
			this.logger.error(`[MIDDLEWARE] Query is not valid`);
			res.status(404).send('Query is not valid');
		} else {
			next();
		}
	}
}
