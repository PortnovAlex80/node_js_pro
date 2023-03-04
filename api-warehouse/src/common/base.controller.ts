import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IControllerRoute } from './route.interface';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			this.logger.log(`${route.method}-${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}

	public jsonResponse(res: Response, code: number, message: string) {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public created(res: Response) {
		return res.sendStatus(201);
	}

	public ok(res: Response, message: string) {
		return this.jsonResponse(res, 200, message);
	}
}
