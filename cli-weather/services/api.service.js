import axios from 'axios';
import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';


const getWeather = async (city) => {
    
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('Api key is valid')
    };
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const { data } = await axios.get(url, {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    }) 
    return data;
};

export { getWeather }