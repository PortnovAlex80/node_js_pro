import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';
export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(409).send(errors);
			} else {
				next();
			}
		});
	}
}
