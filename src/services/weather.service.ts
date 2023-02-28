import { OpenWeatherApi } from '../api/openweatherapi';
import { WeatherResponse } from './weater.response.interface';
import { ILogger } from './logger.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class WeatherService {
	constructor(
		@inject(Symbol.for('ILogger')) private logger: ILogger,
		@inject(Symbol.for('OpenWeatherApi')) private openWeatherApi: OpenWeatherApi,
	) {}

	async isCityExist(city: string): Promise<boolean | WeatherResponse> {
		try {
			const response: WeatherResponse | boolean = await this.openWeatherApi.openWeatherApi(
				city as string,
			);
			if (!response) {
				this.logger.error(`[SERVICE] Not weather information`);
				return false;
			}
			return response;
		} catch (e) {
			this.logger.error(`[SERVICE] Error ${e}`);
			return false;
		}
	}

	async weatherService(city: string): Promise<boolean | WeatherResponse> {
		const data = await this.isCityExist(city);
		if (data) {
			return data;
		}
		return false;
	}
}
