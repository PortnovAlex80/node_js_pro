const helpDesk = require("./help.js");
const EventEmiiter = require('events');
const { add, subtraction, multiply, devision } = require("./math");
const calcEmitter = new EventEmiiter();

// Emitter blocks
calcEmitter.on('add', (a, b) => { calcEmitter.emit('result', add(a, b))});
calcEmitter.on('multy', (a, b) => { calcEmitter.emit('result', multiply(a, b))});
calcEmitter.on('sub', (a, b) => { calcEmitter.emit('result', subtraction(a, b))});
calcEmitter.on('dev', (a, b) => { calcEmitter.emit('result', devision(a, b))});
calcEmitter.on('result', (result) => { console.log(result)})
calcEmitter.on('help', (a, b) => { calcEmitter.emit('result', helpDesk())});

// get args and check
let operation = process.argv[4] || 'add'; // default operation is add
const argument1 = Number(process.argv[2]);
const argument2 = Number(process.argv[3]) || 0; // 
!isNaN(argument1) ? argument1 : (operation = 'help'); // is first argument is empty or 0 

switch (operation) {
   case ('add' || undefined) : 
    calcEmitter.emit('add', argument1, argument2);
    break;
    case 'sub' : 
    calcEmitter.emit('sub', argument1, argument2);
    break;
    case 'multy' : 
    calcEmitter.emit('multy', argument1, argument2);
    break;
    case 'dev' : 
    !(argument2 === 0) 
        && calcEmitter.emit('dev', argument1, argument2) 
        || console.log('Devision by zero');
    break;
    case 'help' : 
    calcEmitter.emit('help', argument1, argument2);
    break;
    default:
    calcEmitter.emit('help', argument1, argument2);  
};