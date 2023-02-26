import { IsString, IsNotEmpty } from 'class-validator';

export class WeatherRequestDto {
	@IsString({ message: 'Not string' })
	@IsNotEmpty({ message: 'Query is empty' })
	city: string;
}
