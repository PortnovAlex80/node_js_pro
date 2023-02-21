const { EventEmitter} = require('events');
const { exit } = require('process');
const { timeInSeconds } = require('./4-2-timer-parser')
const errorEmitter = new EventEmitter();

const schema = 'hms'.split("");
const [ , , ...stringTiming] = process.argv;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECONDS= 1000;

errorEmitter.on('error', (err) => {
    console.log('ERROR ' + err);
    exit(-1);
});

const timePrefixes = stringTiming.filter( args => schema.some(hms => args.slice(-1) === (hms)));
(!timePrefixes.length) && errorEmitter.emit('error', `Not present time prefix`);

const set = new Set(timePrefixes);
set.size !== timePrefixes.length && errorEmitter.emit('error', `Duplicates found`);

// const timeInSeconds = timePrefixes.reduce( (clock, hms) => {  
//     const value = Number(hms.split("").slice(0,-1).join(""));
//     const prefix = hms.slice(-1);
//     if (prefix === 'h') {
//         return (value > 0 && value  < 23) ? clock += value * SECONDS_IN_HOUR : errorEmitter.emit('error', 'Hours out range 0..23h');
//         };
//     if (prefix === 'm') { 
//         return (value > 0 && value  < 59) ? clock += value * SECONDS_IN_MINUTE : errorEmitter.emit('error', 'Minuts out range 0..59m');
//         };
//     return (value > 0 && value  < 59) ? clock += value : errorEmitter.emit('error', 'Seconds out range 0..59m');
//     }, 0);
timeInSeconds(timePrefixes);

const milliseconds = timeInSeconds * MILLISECONDS_IN_SECONDS;

setTimeout(() => {
    console.log('Alarm time is run out! Wake up!');
}, milliseconds);
