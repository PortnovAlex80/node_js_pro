import express, { NextFunction, Request, Response, Router } from 'express';
import { HTTPError } from '../exceptionhandlers/http-error';
import { LoggerService } from '../services/logger.service';
import { query, validationResult } from 'express-validator';
import { adapterOpenWeatherApi } from '../adapters/openweatherapi';
import { WeatherService } from '../services/weather.service';

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
