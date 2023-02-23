import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed(` ERROR ${error}`));
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(` SUCCESS ${message}`));
};

const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(` HELP `)}
        without parametrs - weather broadcast
        -s [CITY] save city
        -h help
        -t [API_KEY] save token
        `)
    );
};

const printWeather = (res, icon) => {
    console.log(
        dedent(`${chalk.bgYellow(` WEATHER `)} in ${res.name}
        ${icon} ${res.weather[0].description}
        Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
        Humidity: ${res.main.humidity}%
        `)
    );
};

export { printError, printSuccess, printHelp, printWeather}