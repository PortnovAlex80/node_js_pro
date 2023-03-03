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

export { printError, printSuccess, printHelp}