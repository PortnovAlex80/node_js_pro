import { OpenWeatherApi } from '../api/openweatherapi';
import { WeatherResponse } from './weater.response.interface';
import { ILogger } from './logger.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class WeatherService {
	constructor(
		@inject(Symbol.for('ILogger')) private logger: ILogger,
		@inject(Symbol.for('OpenWeatherApi')) private openWeatherApi: OpenWeatherApi,
	) {
		this.logger = logger;
		this.openWeatherApi = openWeatherApi;
	}

	async isCityExist(city: string): Promise<boolean | String> {
		try {
			const response = await this.openWeatherApi.openWeatherApi(city as string);
			const data = JSON.parse(response);
			if (data.cod !== 200) {
				this.logger.log(`[SERVICE] Error - ${data.cod}`);
				return false;
			}
			return JSON.stringify(data);
		} catch (e) {
			this.logger.log(`[SERVICE] City not found - ${city}`);
			return false;
		}
	}

	async weatherService(city: string): Promise<boolean | WeatherResponse> {
		const isCity = await this.isCityExist(city);
		if (!isCity) {
			return false;
		} else {
			const data = JSON.parse(isCity as string);
			const result = {
				city: data.name,
				temp: data.main.temp,
				wind: data.wind.speed,
			};
			return result;
		}
	}
}
