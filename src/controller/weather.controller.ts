import express, { NextFunction, Request, Response, Router } from 'express';
import { HTTPError } from '../exceptionhandlers/http-error';
import { LoggerService } from '../services/logger.service';
import { query, validationResult } from 'express-validator';

const weatherRouter = Router();
const logger = new LoggerService();

weatherRouter.get(
	'/weatherincity',
	[query('city').notEmpty().withMessage('City is required')],
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return next(new HTTPError(400, 'Not valid query params', 'weatherincity'));
		}
		const { city } = req.query;
		if (!city) {
			return next(new HTTPError(404, 'City not found', 'weatherincity'));
		} else {
			logger.log(`[ROUTER] City set - ${city}`);
			return res.status(200).send(city);
		}
	},
);

export { weatherRouter };
