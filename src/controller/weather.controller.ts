import express, { NextFunction, Request, Response, Router } from 'express';
import { HTTPError } from '../exceptionhandlers/http-error';
import { LoggerService } from '../services/logger.service';
import { query, validationResult } from 'express-validator';
import { adapterOpenWeatherApi } from '../adapters/openweatherapi';
import { WeatherService } from '../services/weather.service';
import { injectable, inject } from 'inversify';
import { ILogger } from '../services/logger.interface';
import { WeatherRequestDto } from '../dto/weather.request.dto';
import 'reflect-metadata';
import { ValidatorMiddleware } from '../middlewares/validate.request';
import { IMiddleware } from '../middlewares/middleware.interface';

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
	middlewares?: IMiddleware[];
}

@injectable()
export class WeatherController {
	private _router: Router = express.Router();
	private routes: IRoute[];

	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {
		this.logger = logger;
		this.routes = [
			{
				path: '/weatherincity',
				func: this.getWeatherInCity,
				method: 'get',
				middlewares: [new ValidatorMiddleware()],
			},
		];
		this.routes.forEach((route) => {
			this.logger.log(`[BINDINGS] ${route.method}:${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			(this._router as any)[route.method](route.path, pipeline);
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
