import { LoggerService } from './logger.service';
import { WeatherResponse } from './weater.response.interface';

export class WeatherConvertorToJson {
	public logger: LoggerService;
	constructor(logger: LoggerService) {
		this.logger = logger;
	}

	convertorWeatherApi(data: string): WeatherResponse {
		this.logger.log('[Weather convert] START ');
		const result: WeatherResponse = {
			city: '',
		};
		const responseExample = {
			coord: {
				lon: 37.6156,
				lat: 55.7522,
			},
			weather: [
				{
					id: 804,
					main: 'Clouds',
					description: 'пасмурно',
					icon: '04d',
				},
			],
			base: 'stations',
			main: {
				temp: 1.95,
				feels_like: -3.35,
				temp_min: 1.24,
				temp_max: 2.3,
				pressure: 996,
				humidity: 88,
				sea_level: 996,
				grnd_level: 977,
			},
			visibility: 9592,
			wind: {
				speed: 6.85,
				deg: 216,
				gust: 14.06,
			},
			clouds: {
				all: 100,
			},
			dt: 1677401974,
			sys: {
				type: 2,
				id: 2000314,
				country: 'RU',
				sunrise: 1677385775,
				sunset: 1677423348,
			},
			timezone: 10800,
			id: 524901,
			name: 'Москва',
			cod: 200,
		};
		const jsonData = JSON.parse(data);
		result['city'] = jsonData.name;
		result['temp'] = jsonData.main.temp;
		result['wind'] = jsonData.wind.speed;
		this.logger.log('[Weather convert] END ');
		return result;
	}
}
