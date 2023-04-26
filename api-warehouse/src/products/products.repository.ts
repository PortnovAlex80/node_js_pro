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
		const skip = 0;
		const take = 50;
		return this.prismaService.client.product.findMany({
			skip,
			take,
		});
	}
	async getProduct(name: string): Promise<ProductModel | null> {
		return await this.prismaService.client.product.findFirst({
			where: {
				name,
			},
		});
	}
	async createProduct(product: Product): Promise<ProductModel | null> {
		const { name, quantity } = product;
		const checkIsProductExist = await this.getProduct(name);
		if (checkIsProductExist) {
			return null;
		}
		const result = this.prismaService.client.product.create({
			data: {
				name,
				quantity,
			},
		});
		return result;
	}
	async updateProduct(product: ProductDto): Promise<ProductModel | null> {
		const { name, quantity } = product;
		const checkIsProductExist = await this.getProduct(name);
		if (!checkIsProductExist) {
			return null;
		}
		return await this.prismaService.client.product.update({
			where: {
				name,
			},
			data: {
				quantity,
			},
		});
	}
	async deleteProduct(name: string): Promise<ProductModel | null> {
		const checkIsProductExist = await this.getProduct(name);
		if (!checkIsProductExist) {
			return null;
		}
		const deletedProduct = this.prismaService.client.product.delete({
			where: {
				name,
			},
		});
		return deletedProduct;
	}
	async inStock(name: string): Promise<number> {
		const result = await this.prismaService.client.product.findFirst({
			where: {
				name,
			},
		});
		if (!result) {
			return 0;
		}
		return result.quantity;
	}
}
