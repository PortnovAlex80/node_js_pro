import express, { NextFunction, Request, Response, Router } from 'express';
import { HTTPError } from '../exceptionhandlers/http-error';
import { LoggerService } from '../services/logger.service';
import { query, validationResult } from 'express-validator';
import { adapterOpenWeatherApi } from '../adapters/openweatherapi';
import { WeatherService } from '../services/weather.service';
import { injectable, inject } from 'inversify';
import { ILogger } from '../services/logger.interface';
import 'reflect-metadata';

// 	'/weatherincity',
// 	[query('city').notEmpty().withMessage('City is required')],
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return next(new HTTPError(400, 'Not valid query params', 'weatherincity'));
// 		}
// 		const { city } = req.query;

interface IRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
}

@injectable()
export class WeatherController {
	private _router: Router = express.Router();
	private routes: IRoute[];

	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {
		this.logger = logger;
		this.routes = [{ path: '/weatherincity', func: this.getWeatherInCity, method: 'get' }];
		this.routes.forEach((route) => {
			(this._router as any)[route.method](route.path, route.func.bind(this));
		});
	}
	getRouter(): Router {
		return this._router;
	}
	getWeatherInCity = (req: Request, res: Response, next: NextFunction) => {
		this.logger.log(`[CONTROLLER] Call business service...`);
		this.logger.log(`[CONTROLLER] Test exceprion handlers...`);
		next(new HTTPError(404, 'City not found', 'WController'));
		//getWeather in city call Weather Service
	};
}
