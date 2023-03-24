export interface IProduct {
	id: number;
	name: string;
	quantity: number;
}
const MAX_PRODUCTS_AMOUNT = 99;
export class Product implements IProduct {
	id: number;
	name: string;
	quantity: number;
	constructor(name: string, quantity = 1) {
		this.quantity = quantity;
		this.name = name;
	}
	changeAmount(amount = 1): void {
		if (this.quantity - amount < 0) {
			return;
		}
		if (this.quantity + amount < MAX_PRODUCTS_AMOUNT) {
			return;
		}
		this.quantity += amount;
	}

	inStock(): number {
		return this.quantity;
	}
}
