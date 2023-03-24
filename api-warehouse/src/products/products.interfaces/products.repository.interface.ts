import { Product } from '../product.entity';
import { Product as ProductModel } from '@prisma/client';
import { ProductDto } from '../dto/product.dto';
export interface IProductsRepository {
	getProducts: () => Promise<ProductModel[] | null>;
	getProduct: (name: string) => Promise<ProductModel | null>;
	createProduct: (product: Product) => Promise<ProductModel | null>;
	updateProduct: (product: ProductDto) => Promise<ProductModel | null>;
	deleteProduct: (name: string) => Promise<ProductModel | null>;
	inStock: (name: string) => Promise<number>;
}
