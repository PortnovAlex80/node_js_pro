import { IsString, IsNotEmpty } from 'class-validator';

export class WeatherRequestDto {
	@IsString()
	@IsNotEmpty()
	city: string;
}
