#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError,  printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token is not valid');
        return;
    }
    try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token saved');
    } catch (e) {
        printError(e.message)
    }
};

const saveCity = async (city) => {
    if (!isCityExist(city)) {
         printError('City is not valid');
         return;
    };
    try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City saved');
    } catch (e) {
            printError(e.message)
        };
};

const isCityExist = async (city) => {
    if (!city.length) {
        printError('City is not valid');
        return false;
    };
    try {
        await getWeather(city);
        return true;
    }   catch(e) {
        return false;
    };
}

const getForcast = async () => {
    try {
        const weather = await getWeather(await getKeyValue(TOKEN_DICTIONARY.city));
        printWeather(weather, '');
    } catch(e) {
        if ((e?.response?.status) == 404) {
            printError('City is not exist');
        } else if (e?.response?.status == 401) {
            printError('Token is not valid');
        } else {
            printError(e.message);
        }
    };
};

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        printHelp();
    };
    if (args.s) {
        return saveCity(args.s);
        // save city
    };
    if (args.t) {
        return saveToken(args.t);
    };
    getForcast();
};

initCLI();