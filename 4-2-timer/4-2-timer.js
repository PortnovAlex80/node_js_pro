const { EventEmitter} = require('events');
const { exit } = require('process');
const errorEmitter = new EventEmitter();

const schema = 'hms'.split("");
const [ , , ...stringTiming] = process.argv;
const MILLISECONDS_IN_SECONDS= 1000;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

function timeInSeconds(timePrefixes) {
const seconds = timePrefixes.reduce( (clock, hms) => {  
    const timePrefix = hms.slice(-1);
    const value = Number(hms.split("").slice(0,-1).join(""));
    if (timePrefix === 'h') {
        return (value > 0 && value  < 23) ? clock += value * SECONDS_IN_HOUR : errorEmitter.emit('error', 'Hours out range 0..23h');
        };
    if (timePrefix === 'm') { 
        return (value > 0 && value  < 59) ? clock += value * SECONDS_IN_MINUTE : errorEmitter.emit('error', 'Minuts out range 0..59m');
        };
    return (value > 0 && value  < 59) ? clock += value : errorEmitter.emit('error', 'Seconds out range 0..59m');
    }, 0);
return seconds;
}

errorEmitter.on('error', (err) => {
    console.log('ERROR ' + err);
    exit(-1);
});

const timePrefixes = stringTiming.filter( args => 
    schema.some( hms => args.slice(-1) === hms) ? true : errorEmitter.emit('error', `Argument ${args} is not valid`)
    );

(!timePrefixes.length) && errorEmitter.emit('error', `No time prefix`);

const set = new Set(timePrefixes);
set.size !== timePrefixes.length && errorEmitter.emit('error', `Duplicates found`);

const milliseconds = timeInSeconds(timePrefixes) * MILLISECONDS_IN_SECONDS;
console.log(`Alarm will start by ${milliseconds / MILLISECONDS_IN_SECONDS} seconds`);

setTimeout(() => {
    console.log('Alarm time is run out! Wake up!');
}, milliseconds);
