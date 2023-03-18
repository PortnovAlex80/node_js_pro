import { injectable } from 'inversify';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { IProductsService } from './products.interfaces/products.service.interface';

@injectable()
export class ProductsService implements IProductsService {
	getProducts: () => Promise<Product[] | null>;
	getProductByName: (product: ProductDto) => Promise<Product | null>;
	async createProduct({ name }: ProductDto): Promise<Product | null> {
		const product = new Product(name);
		return product;
	}
	updateProduct: (product: ProductDto) => Promise<boolean>;
	deleteProductByName: (product: ProductDto) => Promise<boolean>;
	increaseAmount: (product: ProductDto) => Promise<boolean>;
	decreaseAmount: (product: ProductDto) => Promise<boolean>;
	inStockByName: (product: ProductDto) => Promise<number>;
	validate: (product: ProductDto) => Promise<Product | null>;
}
