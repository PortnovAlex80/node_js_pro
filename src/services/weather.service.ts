import { OpenWeatherApi } from '../api/openweatherapi';
import { WeatherResponse } from './weater.response.interface';
import { ILogger } from './logger.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class WeatherService {
	private _city: string;
	private _weatherjson: WeatherResponse;

	constructor(
		@inject(Symbol.for('ILogger')) private logger: ILogger,
		@inject(Symbol.for('OpenWeatherApi')) private openWeatherApi: OpenWeatherApi,
	) {
		this.logger = logger;
		this.openWeatherApi = openWeatherApi;
	}

	async isCityExist(city: string): Promise<boolean> {
		try {
			const response = await this.openWeatherApi.openWeatherApi(city as string);
			const data = JSON.parse(response);
			if (data.cod !== 200) {
				this.logger.log(`[SERVICE] Error - ${data.cod}`);
				return false;
			}
			this._city = city;
			this._weatherjson = {
				city: this._city,
				temp: data.main.temp,
				wind: data.wind.speed,
			};
			return true;
		} catch (e) {
			this.logger.log(`[SERVICE] City not found - ${city}`);
			return false;
		}
	}

	async weatherService(city: string): Promise<boolean | WeatherResponse> {
		const isCity: boolean = await this.isCityExist(city);
		if (!isCity) {
			return false;
		} else {
			return this._weatherjson;
		}
	}
}
