import { Product } from '../product.entity';
import { Product as ProductModel } from '@prisma/client';
import { ProductDto } from '../dto/product.dto';
export interface IProductsRepository {
	getProducts: () => Promise<ProductModel[] | null>;
	getProduct: (nproduct: ProductDto) => Promise<ProductModel | null>;
	createProduct: (product: Product) => Promise<ProductModel | null>;
	updateProduct: (product: ProductDto) => Promise<ProductModel | null>;
	deleteProduct: (product: ProductDto) => Promise<ProductModel | null>;
	increaseAmount: (product: ProductDto) => Promise<ProductModel | null>;
	decreaseAmount: (product: ProductDto) => Promise<ProductModel | null>;
	inStock: (product: ProductDto) => Promise<number>;
	info: (product: ProductDto) => Promise<ProductModel | null>;
}
