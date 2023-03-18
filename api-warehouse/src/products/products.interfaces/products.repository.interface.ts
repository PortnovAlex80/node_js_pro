import { Product } from '../product.entity';

export interface IProductsRepository {
	getProducts: () => Promise<Product[] | null>;
	getProductByName: (name: string) => Promise<Product | null>;
	createProduct: (rproduct: Product) => Promise<boolean>;
	updateProduct: (rproduct: Product) => Promise<boolean>;
	deleteProductByName: (name: string) => Promise<boolean>;
	increaseAmount: (amount: number) => Promise<boolean>;
	decreaseAmount: (amount: number) => Promise<boolean>;
	inStockByName: (name: string) => Promise<number>;
	info: (name: string) => Promise<Product | null>;
}
