import express, { NextFunction, Request, Response, Router } from 'express';
import { HTTPError } from '../exceptionhandlers/http-error';
import { LoggerService } from '../services/logger.service';
import { query, validationResult } from 'express-validator';
import { adapterOpenWeatherApi } from '../adapters/openweatherapi';
import { WeatherConvertorToJson } from '../services/weather.service';

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
			try {
				const data = await adapterOpenWeatherApi(city as string);
				const codeResponse = JSON.parse(data).cod;
				logger.log(`[ROUTER] Send data to service - ${data}`);
				if (codeResponse !== 200) {
					return next(new HTTPError(404, 'Unknown error', 'CONTROLLER'));
				}
				const weatherConvertor = new WeatherConvertorToJson(logger);
				const result = weatherConvertor.convertorWeatherApi(data);
				return res.status(200).send(result);
			} catch (e) {
				return next(new HTTPError(404, 'City not found', 'CONTROLLER'));
			}
		}
	},
);

export { weatherRouter };
