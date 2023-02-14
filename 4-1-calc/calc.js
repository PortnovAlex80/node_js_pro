const helpDesk = require("./help.js");
const { add, subtraction, multiply, devision } = require("./math");

let operation = process.argv[4] || 'add';
const argument1 = Number(process.argv[2]) || 0;
const argument2 = Number(process.argv[3]) || 0;
argument1 ? argument1 : (operation = 'help'); 

switch (operation) {
   case ('add' || undefined) : 
    console.log(`calculate ${argument1} + ${argument2} = ${add(argument1, argument2)}`);
    break;
    case 'sub' : 
    console.log(`calculate ${argument1} - ${argument2} = ${subtraction(argument1, argument2)}`);
    break;
    case 'multy' : 
    console.log(`calculate ${argument1} * ${argument2} = ${multiply(argument1, argument2)}`);
    break;
    case 'dev' : 
    console.log(`calculate ${argument1} / ${argument2} = ${devision(argument1, argument2)}`);
    break;
    case 'help' : 
    helpDesk();
    break;
    default:
    helpDesk();       
};