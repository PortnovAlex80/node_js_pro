import express, { NextFunction, Request, Response, Router } from 'express';
import { HTTPError } from '../exceptionhandlers/http-error';
import { LoggerService } from '../services/logger.service';
import { query, validationResult } from 'express-validator';
import { adapterOpenWeatherApi } from '../adapters/openweatherapi';
import { WeatherService } from '../services/weather.service';
import { injectable, inject } from 'inversify';
import { ILogger } from '../services/logger.interface';

const weatherRouter = Router();
const logger = new LoggerService();

weatherRouter.get(
	'/weatherincity',
	[query('city').notEmpty().withMessage('City is required')],
	async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(new HTTPError(400, 'Not valid query params', 'weatherincity'));
		}
		const { city } = req.query;
		if (!city) {
			return next(new HTTPError(404, 'Something went wrong', 'weatherincity'));
		} else {
			logger.log(`[ROUTER] City set - ${city}`);
			const weatherData = new WeatherService(logger);
			const result = await weatherData.weatherService(city as string);
			if (!result) {
				return next(new HTTPError(404, 'City not found', 'CONTROLLER'));
			}
			return res.status(200).send(result);
		}
	},
);

export { weatherRouter };

@injectable()
export class WeatherController {
	_router: Router;
	routes: IRoute[];

	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {
		this.logger = logger;

		this.routes = [{ path: '/weatherincity', func: this.getWeatherInCity, method: 'get' }];
		this.routes.forEach((route) => {
			(this._router as any)[route.method](route.path, route.func.bind(this));
		});
	}

	getWeatherInCity = (req: Request, res: Response, next: NextFunction) => {
		this.logger.log(`[CONTROLLER] Call business service...`);
		//getWeather in city call Weather Service
	};
}

interface IRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
}
