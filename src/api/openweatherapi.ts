import axios from 'axios';
import dotenv from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../services/logger.interface';
import 'reflect-metadata';

@injectable()
export class OpenWeatherApi {
	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {
		this.logger = logger;
	}

	openWeatherApi = async (city: string) => {
		dotenv.config();
		const token = process.env.TOKEN;
		if (!token) {
			this.logger.error('Не задан ключ API');
		}
		const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
			params: {
				q: city,
				appid: token,
				lang: 'ru',
				units: 'metric',
			},
		});
		return JSON.stringify(data);
	};
}
