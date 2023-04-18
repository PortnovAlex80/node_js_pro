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
		const products = await this.productsRepository.getProducts();
		return products;
	}

	async getProduct(name: string): Promise<ProductModel | null> {
		const result = await this.productsRepository.getProduct(name);
		if (!result) {
			return null;
		}
		return result;
	}

	async createProduct(product: ProductDto): Promise<ProductModel | null> {
		console.log(product.name);
		console.log(product.quantity);

		const result = await this.productsRepository.createProduct(
			new Product(product.name, product.quantity),
		);
		if (!result) {
			return null;
		}
		return result;
	}
	async updateProduct(product: ProductDto): Promise<ProductModel | null> {
		const result = await this.productsRepository.updateProduct(product);
		if (!result) {
			return null;
		}
		return result;
	}

	async deleteProduct(name: string): Promise<ProductModel | null> {
		const result = await this.productsRepository.deleteProduct(name);
		if (!result) {
			return null;
		}
		return result;
	}

	async inStock(name: string): Promise<number | null> {
		const result = await this.productsRepository.inStock(name);
		if (!result) {
			return null;
		}
		return result;
	}
	async info(name: string): Promise<ProductModel | null> {
		const info = await this.productsRepository.getProduct(name);
		if (!info) {
			return null;
		}
		return info;
	}
}
