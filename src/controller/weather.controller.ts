import express, { NextFunction, Request, Response, Router } from 'express';
import { HTTPError } from '../exceptionhandlers/http-error';
import { LoggerService } from '../services/logger.service';

const weatherRouter = Router();
const logger = new LoggerService();

weatherRouter.get('/weatherincity', (req: Request, res: Response, next: NextFunction) => {
	const { city } = req.query;
	if (!city) {
		next(new HTTPError(404, 'City not found', 'weatherincity'));
	} else {
		logger.log(`[ROUTER] City set - ${city}`);
		res.status(200).send(city);
	}
});

export { weatherRouter };
