import axios from 'axios';
import dotenv from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../services/logger.interface';
import 'reflect-metadata';
import { WeatherResponse } from '../services/weater.response.interface';

@injectable()
export class OpenWeatherApi {
	private openweatherAPI_URL: string;
	result: WeatherResponse;
	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {}

	errorResult = (): void => {
		this.result = {
			response: false,
		};
	};

	openWeatherApi = async (city: string): Promise<WeatherResponse> => {
		dotenv.config();
		const token = process.env.TOKEN;
		if (!token) {
			this.logger.error('Не задан ключ API');
			this.errorResult();
			return this.result;
		}
		const apiUrl = process.env.API_URL;
		if (!apiUrl) {
			this.logger.error('Не задан url API');
			this.errorResult();
			return this.result;
		} else {
			this.openweatherAPI_URL = apiUrl;
		}
		const params = {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric',
		};
		try {
			const { data } = await axios.get(this.openweatherAPI_URL, { params });
			if (data.cod !== 200) {
				this.logger.error(`[WEATHER API] Error. Response code is is not 200`);
				this.errorResult();
				return this.result;
			}
			this.result = {
				response: true,
				city: data.name,
				temp: data.main.temp,
				wind: data.wind.speed,
			};
			return this.result;
		} catch (error) {
			this.logger.error(`[WEATHER API] Error. ${error}`);
			this.errorResult();
			return this.result;
		}
	};
}
