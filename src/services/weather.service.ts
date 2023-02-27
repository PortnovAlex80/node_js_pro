import { adapterOpenWeatherApi } from '../adapters/openweatherapi';
import { WeatherResponse } from './weater.response.interface';
import { ILogger } from './logger.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class WeatherService {
	private _city: string;

	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {
		this.logger = logger;
	}

	convertorWeatherApi(data: string): WeatherResponse {
		const result: WeatherResponse = {
			city: '',
		};
		const jsonData = JSON.parse(data);
		result['city'] = jsonData.name;
		result['temp'] = jsonData.main.temp;
		result['wind'] = jsonData.wind.speed;
		return result;
	}

	async isCityExist(city: string): Promise<boolean> {
		try {
			const data = await this.getWeatherApiData(city);
			const codeResponse = JSON.parse(data).cod;
			if (codeResponse !== 200) {
				return false;
			}
			this._city = city;
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
			const data = await this.getWeatherApiData(this._city);
			const result: WeatherResponse = await this.convertorWeatherApi(data);
			return result;
		}
	}

	async getWeatherApiData(city: string): Promise<string> {
		const data = await adapterOpenWeatherApi(city as string);
		return data;
	}
}
