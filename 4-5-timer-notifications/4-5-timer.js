const notifier = require('node-notifier');
const { EventEmitter} = require('events');
const { exit } = require('process');
const errorEmitter = new EventEmitter();
const schema = 'hms'.split("");
const [ , , ...stringTiming] = process.argv;
const MILLISECONDS_IN_SECONDS= 1000;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

errorEmitter.on('error', (err) => {
    console.log('ERROR ' + err);
    exit(-1);
});

function isTimeInterval24h(hour) {
    return (hour > 0 && hour  < 23)
};

function isTimeInterval60sec(min) {
    return (min > 0 && min  < 59)
};

function isTimePrefixOK(timeArgument) {
    return schema.some( hms => timeArgument.slice(-1) === hms) ? true : errorEmitter.emit('error', `Argument ${timeArgument} is not valid`)
};

function isDuplcatesPrefix(timePrefixes) {
  const set = new Set(timePrefixes);
  return set.size !== timePrefixes.length;
};

function totalMilliseconds(timePrefixes) {
const seconds = timePrefixes.reduce( (clock, hms) => {  
    const timePrefix = hms.slice(-1);
    const value = Number(hms.split("").slice(0,-1).join(""));
    
    if (timePrefix === 'h') {
        return isTimeInterval24h(value) 
        ? clock += value * SECONDS_IN_HOUR 
        : errorEmitter.emit('error', 'Hours out range 0..23h');
        };
    if (timePrefix === 'm') { 
        return isTimeInterval60sec(value) 
        ? clock += value * SECONDS_IN_MINUTE 
        : errorEmitter.emit('error', 'Minuts out range 0..59m');
        };
    return isTimeInterval60sec(value) 
    ? clock += value 
    : errorEmitter.emit('error', 'Seconds out range 0..59m');
    }, 0);

return seconds * MILLISECONDS_IN_SECONDS;
};

const timePrefixes = stringTiming.filter( args => isTimePrefixOK(args));
(!timePrefixes.length) && errorEmitter.emit('error', `No time prefix`);

isDuplcatesPrefix && errorEmitter.emit('error', `Duplicates found`);

setTimeout(() => {
  notifier.notify({
  title: 'Alarm notification!',
  message: 'Alarm time is run out! Wake up!'
})
}, totalMilliseconds(timePrefixes));