import axios from 'axios';
import dotenv from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../services/logger.interface';
import 'reflect-metadata';
import { WeatherResponse } from '../services/weater.response.interface';

@injectable()
export class OpenWeatherApi {
	private openweatherAPI_URL = 'https://api.openweathermap.org/data/2.5/weather';
	result: WeatherResponse;
	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {}

	openWeatherApi = async (city: string): Promise<boolean | WeatherResponse> => {
		dotenv.config();
		const token = process.env.TOKEN;
		if (!token) {
			this.logger.error('Не задан ключ API');
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
				return false;
			}
			this.result = {
				city: data.name,
				temp: data.main.temp,
				wind: data.wind.speed,
			};
			return this.result;
		} catch (error) {
			this.logger.error(`[WEATHER API] Error. ${error}`);
			return false;
		}
	};
}
