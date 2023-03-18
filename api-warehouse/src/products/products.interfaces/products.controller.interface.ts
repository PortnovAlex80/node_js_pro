import { NextFunction, Response, Request } from 'express';
import { Product } from '../product.entity';

export interface IProductsController {
	getProducts: (req: Request, res: Response, next: NextFunction) => void;
	getProductByName: (req: Request, res: Response, next: NextFunction) => void;
	createProduct: (req: Request, res: Response, next: NextFunction) => void;
	updateProduct: (req: Request, res: Response, next: NextFunction) => void;
	deleteProductByName: (
		req: Request,
		res: Response,
		next: NextFunction,
	) => void;
	increaseAmount: (req: Request, res: Response, next: NextFunction) => void;
	decreaseAmount: (req: Request, res: Response, next: NextFunction) => void;
	inStockByName: (req: Request, res: Response, next: NextFunction) => void;
	info: (req: Request, res: Response, next: NextFunction) => void;
}
