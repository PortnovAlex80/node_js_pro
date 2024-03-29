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
		const roleAdmin = new RoleMiddleware(
			[UserRole.Admin, UserRole.User],
			secret,
		);
		const authGuard = new AuthGuard();
		const validateProductDTO = new ValidateMiddleware(ProductDto);
		const PRODUCTS_PATH = '/products';

		this.bindRoutes([
			{
				path: PRODUCTS_PATH,
				method: 'get',
				func: this.getProducts,
				middlewares: [authGuard],
			},
			{
				path: `${PRODUCTS_PATH}/product`,
				method: 'post',
				func: this.getProduct,
				middlewares: [validateProductDTO, authGuard],
			},
			{
				path: `${PRODUCTS_PATH}`,
				method: 'post',
				func: this.createProduct,
				middlewares: [validateProductDTO, authGuard, roleAdmin],
			},
			{
				path: `${PRODUCTS_PATH}`,
				method: 'put',
				func: this.updateProduct,
				middlewares: [validateProductDTO, authGuard, roleAdmin],
			},
			{
				path: `${PRODUCTS_PATH}`,
				method: 'delete',
				func: this.deleteProduct,
				middlewares: [validateProductDTO, authGuard, roleAdmin],
			},
			{
				path: `${PRODUCTS_PATH}/instock`,
				method: 'post',
				func: this.inStock,
				middlewares: [validateProductDTO, authGuard],
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

	async getProduct(
		{ body }: Request<{}, {}, ProductDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const product = await this.productsService.getProduct(body.name);
		if (!product) {
			return next(new HTTPError(404, `Product не найден в системе`));
		}
		this.ok(res, product);
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
	async updateProduct(
		{ body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.productsService.updateProduct(body);
		if (!result) {
			return next(new HTTPError(409, 'Product already exist'));
		}
		this.ok(res, result);
	}
	async deleteProduct(
		{ body }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.productsService.deleteProduct(body.name);
		if (!result) {
			return next(new HTTPError(409, 'Product already exist'));
		}
		this.ok(res, result);
	}

	async inStock(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, '1 inStockByName ');
	}
}
