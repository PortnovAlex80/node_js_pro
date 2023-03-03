#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError,  printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

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

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        // help
        printHelp();
    };
    if (args.s) {
      
        // save city
    };
    if (args.t) {
        // save toker
        return saveToken(args.t);
    };
    // show the weater    
    getWeather('moscow');

};

initCLI();