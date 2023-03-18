import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class ProductDto {
	@IsNotEmpty({ message: `Name is empty` })
	name: string;

	@IsOptional()
	@IsInt()
	quantity?: string;
}
