import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { IProductsRepository } from './products.interfaces/products.repository.interface';
import { IProductsService } from './products.interfaces/products.service.interface';
import { Product as ProductModel } from '@prisma/client';

@injectable()
export class ProductsService implements IProductsService {
	constructor(
		@inject(TYPES.ConfigService)
		private configService: IConfigService,
		@inject(TYPES.ProductsRepository)
		private productsRepository: IProductsRepository,
	) {}

	async getProducts(): Promise<ProductModel[] | null> {
		const skip = Number(this.configService.get('SKIP'));
		const take = Number(this.configService.get('TAKE'));

		if (!skip) {
			throw new Error('Skip pagination is not found or not number');
		}
		if (!take) {
			throw new Error('Take pagination is not found or not number');
		}

		return await this.productsRepository.getProducts(skip, take);
	}

	async getProduct(name: string): Promise<ProductModel | null> {
		return await this.productsRepository.getProduct(name);
	}

	async createProduct(product: ProductDto): Promise<ProductModel | null> {
		return await this.productsRepository.createProduct(
			new Product(product.name, product.quantity),
		);
	}
	async updateProduct(product: ProductDto): Promise<ProductModel | null> {
		return await this.productsRepository.updateProduct(product);
	}

	async deleteProduct(name: string): Promise<ProductModel | null> {
		return await this.productsRepository.deleteProduct(name);
	}

	async inStock(name: string): Promise<number | null> {
		const result = await this.productsRepository.inStock(name);
		if (!result) {
			return null;
		}
		return result;
	}
	async info(name: string): Promise<ProductModel | null> {
		return await this.productsRepository.getProduct(name);
	}
}
