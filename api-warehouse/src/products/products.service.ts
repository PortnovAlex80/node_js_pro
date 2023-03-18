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
	async getProduct(product: ProductDto): Promise<ProductModel | null> {
		const result = await this.productsRepository.getProduct(product);
		if (!result) {
			return null;
		}
		return result;
	}

	async createProduct(product: ProductDto): Promise<ProductModel | null> {
		let quantity = Number(product.quantity);
		if (!quantity || quantity <= 0) {
			quantity = 1;
		}
		const newProduct = quantity
			? new Product(product.name, quantity)
			: new Product(product.name, 1);

		const isExist = await this.productsRepository.info(product);
		if (isExist) {
			return null;
		}
		const result = await this.productsRepository.createProduct(newProduct);
		if (!result) {
			return null;
		}
		return result;
	}
	updateProduct: (product: ProductDto) => Promise<ProductModel | null>;
	deleteProduct: (product: ProductDto) => Promise<ProductModel>;
	increaseAmount: (product: ProductDto) => Promise<ProductModel>;
	decreaseAmount: (product: ProductDto) => Promise<ProductModel>;
	inStockByName: (product: ProductDto) => Promise<number>;
	validate: (product: ProductDto) => Promise<Product | null>;
}
