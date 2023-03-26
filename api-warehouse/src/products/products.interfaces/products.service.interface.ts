import { ProductDto } from '../dto/product.dto';
import { Product } from '../product.entity';
import { Product as ProductModel } from '@prisma/client';

export interface IProductsService {
	getProducts: () => Promise<ProductModel[] | null>;
	getProduct: (name: string) => Promise<ProductModel | null | null>;
	createProduct: (product: ProductDto) => Promise<ProductModel | null>;
	updateProduct: (product: ProductDto) => Promise<ProductModel | null>;
	deleteProduct: (name: string) => Promise<ProductModel | null>;
	inStock: (name: string) => Promise<number | null>;
}
