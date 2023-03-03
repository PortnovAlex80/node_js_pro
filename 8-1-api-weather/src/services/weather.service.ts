import { OpenWeatherApi } from '../api/openweatherapi';
import { WeatherResponse } from './weater.response.interface';
import { ILogger } from './logger.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class WeatherService {
	private _result: WeatherResponse;

	constructor(
		@inject(Symbol.for('ILogger')) private logger: ILogger,
		@inject(Symbol.for('OpenWeatherApi')) private openWeatherApi: OpenWeatherApi,
	) {}

	errorResult = (): WeatherResponse => {
		return {
			response: false,
		};
	};

	async getWeatherData(city: string): Promise<boolean> {
		try {
			const response: WeatherResponse = await this.openWeatherApi.openWeatherApi(city as string);
			if (!response) {
				this.logger.error(`[SERVICE] Not weather information`);
				return false;
			}
			this._result = response;
			return true;
		} catch (e) {
			this.logger.error(`[SERVICE] Error ${e}`);
			return false;
		}
	}

	isCityExist(): boolean {
		if (!this._result.city) {
			return false;
		}
		return true;
	}

	async weatherService(city: string): Promise<WeatherResponse> {
		await this.getWeatherData(city);
		if (this.isCityExist()) {
			return {
				response: true,
				city: this._result.city,
				temp: this._result?.temp,
				wind: this._result?.wind,
			};
		}
		return this.errorResult();
	}
}
