const isCheck = require('./4-2-timer-check');
const timingParserToSeconds = require('./4-2-timer-parser');
const stringTiming = process.argv;

isCheck(stringTiming) && setTimeout(() => {
    console.log('Alarm time is run out! Wake up!')
}, timingParserToSeconds(stringTiming) * 1000);

