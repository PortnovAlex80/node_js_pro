import { ProductDto } from '../dto/product.dto';
import { Product } from '../product.entity';

export interface IProductsService {
	getProducts: () => Promise<Product[] | null>;
	getProductByName: (product: ProductDto) => Promise<Product | null>;
	createProduct: (product: ProductDto) => Promise<Product | null>;
	updateProduct: (product: ProductDto) => Promise<boolean>;
	deleteProductByName: (product: ProductDto) => Promise<boolean>;
	increaseAmount: (product: ProductDto) => Promise<boolean>;
	decreaseAmount: (product: ProductDto) => Promise<boolean>;
	inStockByName: (product: ProductDto) => Promise<number>;
	validate: (product: ProductDto) => Promise<Product | null>;
}
