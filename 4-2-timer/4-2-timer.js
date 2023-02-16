//  1h 5m 10s
//  00h 00m 00s - 0 - 0 - 0
//  // trim all spaces
//  // check max - 11
//  // min lenght - 2 5m 
//  // split(" ") - 1- 3 elements
// // h m s must be
// // if 1 el - 1 m 
const isCheck = require('./4-2-timer-check')

const stringTiming = process.argv//.splice(-3);
const lengthArgument = stringTiming.length;
//console.log(stringTiming); // checking

isCheck(stringTiming);
