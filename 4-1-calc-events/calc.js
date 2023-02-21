`use strict`
const helpDesk = require("./help.js");
const EventEmiiter = require('events');
const { add, subtraction, multiply, division } = require("./math");
const calcEmitter = new EventEmiiter();

const [ , , argument1, argument2, operation = 'add'] = process.argv;
const operations = {
    'add': add,
    'sub': subtraction,
    'mult': multiply,
    'div': division,
    'help': helpDesk,
    '': helpDesk,
};

if (isNaN(argument1) || isNaN(argument2)) {
    console.log(`ERROR 1: ${argument1} or ${argument2} is not a valid.`);
    helpDesk();
    process.exit(1);
};

if (!Object.keys(operations).includes(operation)) {
    console.log(`ERROR 2: ${operation} is not a valid operation.`);
    helpDesk();
    process.exit(1);
} 

if (operation === 'div' && argument2 === 0) {
    console.log(`ERROR-3: Division by zero. Exit`);
    process.exit(1)};

calcEmitter.on('add', (a, b) => { calcEmitter.emit('result' , add(a, b))});
calcEmitter.on('mult', (a, b) => { calcEmitter.emit('result', multiply(a, b))});
calcEmitter.on('sub', (a, b) => { calcEmitter.emit('result', subtraction(a, b))});
calcEmitter.on('div', (a, b) => { calcEmitter.emit('result', division(a, b))});
calcEmitter.on('help', (a, b) => { calcEmitter.emit('result', helpDesk())});
calcEmitter.on('result', (result) => { console.log(`Calculation ${argument1} ${operation} ${argument2} = ${result}`);});

calcEmitter.emit(operation, Number(argument1), Number(argument2));
