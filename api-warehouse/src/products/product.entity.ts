export interface IProduct {
	id: number;
	name: string;
	quantity: number;
}

export class Product implements IProduct {
	id: number;
	name: string;
	quantity: number;
	constructor(name: string, quantity?: number) {
		if (!quantity) {
			this.quantity = 1;
		} else {
			this.quantity = quantity;
		}
		this.name = name;
	}
	increase(amount = 1): void {
		for (let i = 1; i <= amount; i++) {
			++this.quantity;
		}
	}
	decrease(amount = 1): void {
		if (this.quantity - amount < 0) {
			return;
		}
		for (let i = 1; i <= amount; i++) {
			++this.quantity;
		}
	}
	inStock(): number {
		return this.quantity;
	}
}
