import { BaseController } from '../common/base.controller';
import { Response, Request, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { ValidateMiddleware } from '../common/validate.middleware';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';
import { RoleMiddleware } from '../common/role.middleware';
import { UserRole } from '../roles/roles';
import { IProductsController } from './products.interfaces/products.controller.interface';
import { IProductsService } from './products.interfaces/products.service.interface';
import { ProductDto } from './dto/product.dto';
import 'reflect-metadata';
import { Product } from './product.entity';

@injectable()
export class ProductsController
	extends BaseController
	implements IProductsController
{
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ProductsService) private productsService: IProductsService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		const secret = this.configService.get('SECRET');
		const roleAdmin = new RoleMiddleware(UserRole.Admin, secret);
		const roleUser = new RoleMiddleware(UserRole.User, secret);
		const authGuard = new AuthGuard();
		const PRODUCTS_PATH = '/products';

		this.bindRoutes([
			{
				path: PRODUCTS_PATH,
				method: 'get',
				func: this.getProducts,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${PRODUCTS_PATH}/:name`,
				method: 'get',
				func: this.getProduct,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${PRODUCTS_PATH}`,
				method: 'post',
				func: this.createProduct,
				middlewares: [new ValidateMiddleware(ProductDto), authGuard, roleAdmin],
			},
			{
				path: `${PRODUCTS_PATH}`,
				method: 'put',
				func: this.updateProduct,
				middlewares: [new ValidateMiddleware(ProductDto), authGuard, roleAdmin],
			},
			{
				path: `${PRODUCTS_PATH}`,
				method: 'delete',
				func: this.deleteProduct,
				middlewares: [new ValidateMiddleware(ProductDto), authGuard, roleAdmin],
			},
			{
				path: `${PRODUCTS_PATH}/increase/:amount`,
				method: 'post',
				func: this.increaseAmount,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: `${PRODUCTS_PATH}/decrease/:amount`,
				method: 'post',
				func: this.decreaseAmount,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: '${PRODUCTS_PATH}/info',
				method: 'get',
				func: this.info,
				middlewares: [authGuard, roleAdmin],
			},
			{
				path: '${PRODUCTS_PATH}/instock',
				method: 'post',
				func: this.inStock,
				middlewares: [authGuard, roleAdmin],
			},
		]);
	}

	async getProducts(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const products = await this.productsService.getProducts();
		if (!products) {
			return next(new HTTPError(404, `Products не найдены в системе`));
		}
		this.ok(res, products);
	}

	getProduct(
		req: Request<{}, {}, ProductDto>,
		res: Response,
		next: NextFunction,
	): void {
		this.ok(res, '1 getProductByName ');
	}
	async createProduct(
		{ body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.productsService.createProduct(body);
		if (!result) {
			return next(new HTTPError(409, 'Product already exist'));
		}
		this.ok(res, result);
	}
	updateProduct(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, '1 updateProduct ');
	}
	deleteProduct(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, '1 deleteProductByName ');
	}
	increaseAmount(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, '1 increaseAmount ');
	}
	decreaseAmount(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, '1 decreaseAmount ');
	}
	inStock(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, '1 inStockByName ');
	}
	info(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, '1 info ');
	}
}
