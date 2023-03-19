import { ProductDto } from '../dto/product.dto';
import { Product } from '../product.entity';
import { Product as ProductModel } from '@prisma/client';

export interface IProductsService {
	getProducts: () => Promise<ProductModel[] | null>;
	getProduct: (product: ProductDto) => Promise<ProductModel | null | null>;
	createProduct: (product: ProductDto) => Promise<ProductModel | null>;
	updateProduct: (product: ProductDto) => Promise<ProductModel | null>;
	deleteProduct: (product: ProductDto) => Promise<ProductModel | null>;
	increaseAmount: (product: ProductDto) => Promise<ProductModel | null>;
	decreaseAmount: (product: ProductDto) => Promise<ProductModel | null>;
	inStock: (product: ProductDto) => Promise<number | null>;
	info: (product: ProductDto) => Promise<ProductModel | null>;
}
