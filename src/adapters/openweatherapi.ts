import axios from 'axios';
import dotenv from 'dotenv';
import { LoggerService } from '../services/logger.service';

const logger = new LoggerService();

const adapterOpenWeatherApi = async (city: string) => {
	dotenv.config();
	const token = process.env.TOKEN;
	console.log(`TOKEN is ${token}`);
	if (!token) {
		logger.error('Не задан ключ API');
	}
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric',
		},
	});
	return data;
};

export { adapterOpenWeatherApi };
