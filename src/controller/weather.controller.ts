import express, { NextFunction, Request, Response, Router } from 'express';
import { HTTPError } from '../exceptionhandlers/http-error';
import { WeatherService } from '../services/weather.service';
import { injectable, inject } from 'inversify';
import { ILogger } from '../services/logger.interface';
import 'reflect-metadata';
import { ValidatorMiddleware } from '../middlewares/validate.request';
import { IMiddleware } from '../middlewares/middleware.interface';

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

	constructor(
		@inject(Symbol.for('ILogger')) private logger: ILogger,
		@inject(Symbol.for('WeatherService')) private weatherService: WeatherService,
	) {
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
	getWeatherInCity = async (req: Request, res: Response, next: NextFunction) => {
		this.logger.log(`[CONTROLLER] Call SERVICE`);
		const result = await this.weatherService.weatherService(req.query.city as string);
		if (!result) {
			return next(new HTTPError(403, 'City not found'));
		}
		return res.status(200).send(result);
	};
}
