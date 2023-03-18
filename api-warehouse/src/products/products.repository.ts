import { PrismaClient, Product as ProductModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { IProductsRepository } from './products.interfaces/products.repository.interface';

@injectable()
export class ProductsRepository implements IProductsRepository {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {}

	getProducts(): Promise<ProductModel[] | null> {
		return this.prismaService.client.product.findMany();
	}
	async getProduct(product: ProductDto): Promise<ProductModel | null> {
		const productInfo = await this.info(product);
		if (!productInfo) {
			return null;
		}
		return productInfo;
	}
	async createProduct(product: Product): Promise<ProductModel | null> {
		const { name, quantity } = product;
		const result = this.prismaService.client.product.create({
			data: {
				name,
				quantity,
			},
		});
		if (!result) {
			return null;
		}
		return result;
	}
	async updateProduct(product: ProductDto): Promise<ProductModel | null> {
		const { name, quantity } = product;
		const isExist = await this.info(product);
		if (!isExist) {
			return null;
		}
		if (!quantity) {
			return null;
		}
		const amount = Number(quantity);

		return await this.prismaService.client.product.update({
			where: {
				name,
			},
			data: {
				quantity: amount,
			},
		});
	}
	async deleteProduct(product: ProductDto): Promise<ProductModel | null> {
		const isExist = await this.info(product);
		if (!isExist) {
			return null;
		}
		const deletedProduct = this.prismaService.client.product.delete({
			where: {
				name: product.name,
			},
		});
		return deletedProduct;
	}
	increaseAmount: (product: ProductDto) => Promise<ProductModel | null>;
	decreaseAmount: (product: ProductDto) => Promise<ProductModel | null>;

	async inStock(product: ProductDto): Promise<number> {
		const result = await this.prismaService.client.product.findFirst({
			where: {
				name: product.name,
			},
		});
		if (!result) {
			return 0;
		}
		return result.quantity;
	}

	async info({ name }: ProductDto): Promise<ProductModel | null> {
		const result = await this.prismaService.client.product.findFirst({
			where: {
				name,
			},
		});
		return result;
	}
}
