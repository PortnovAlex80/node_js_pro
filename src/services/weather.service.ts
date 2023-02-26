import { adapterOpenWeatherApi } from '../adapters/openweatherapi';
import { LoggerService } from './logger.service';
import { WeatherResponse } from './weater.response.interface';
import express, { NextFunction, Request, Response, Router } from 'express';
import { ILogger } from './logger.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class WeatherService {
	private _city: string;

	constructor(@inject(Symbol.for('ILogger')) private logger: ILogger) {
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

	async isCityExist(city: string): Promise<boolean> {
		try {
			const data = await this.getWeatherApiData(city);
			const codeResponse = JSON.parse(data).cod;
			this.logger.log(`[SERVICE] Send data to service - ${data}`);
			if (codeResponse !== 200) {
				return false;
			}
			this._city = city;
			this.logger.log(`[siCityExist] city _city - ${this._city}`);
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
			this.logger.log(`[weatherService] City found - ${city}`);
			this.logger.log(`[weatherService] _city  - ${this._city}`);
			const data = await this.getWeatherApiData(this._city);
			this.logger.log(`[weatherService] data from getWeaterApi - ${data}`);

			const result: WeatherResponse = await this.convertorWeatherApi(data);
			this.logger.log(`[weatherService] result - ${result}`);

			return result;
		}
	}

	async getWeatherApiData(city: string): Promise<string> {
		const data = await adapterOpenWeatherApi(city as string);
		const codeResponseData: string = JSON.parse(data);
		this.logger.log(`[getWeaterAPI] data from getWeaterApi - ${data}`);

		return data;
	}
}
