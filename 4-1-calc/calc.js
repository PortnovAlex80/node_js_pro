`use strict`
const helpdesk = require("./help.js");
const { add, subtraction, multiply, division } = require("./math");

const [ , , argument1, argument2, operation = 'add'] = process.argv;
const operations = {
    'add': add,
    'sub': subtraction,
    'mult': multiply,
    'div': division
};

if (isNaN(argument1) || isNaN(argument2)) {
    console.log(`ERROR 1: ${argument1} or ${argument2} is not a valid.`);
    helpdesk();
    process.exit(1);
};

if (!Object.keys(operations).includes(operation)) {
    console.log(`ERROR 2: ${operation} is not a valid operation.`);
    helpdesk();
    process.exit(1);
} 

if (operation === 'div' && argument2 === 0) {
    console.log(`ERROR-3: Division by zero. Exit`);
    process.exit(1)};

const result = operations[operation](Number(argument1), Number(argument2));
console.log(`Calculation ${argument1} ${operation} ${argument2} = ${result}`);