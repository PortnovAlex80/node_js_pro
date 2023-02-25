import express, { NextFunction, Request, Response, Router } from 'express';

const weatherRouter = Router();

weatherRouter.get('/weatherincity', (req: Request, res: Response) => {
	res.send('Weatrher in city is');
});

export { weatherRouter };
