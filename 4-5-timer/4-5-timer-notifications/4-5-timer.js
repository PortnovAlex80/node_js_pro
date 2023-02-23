const isCheck = require('./4-5-timer-check');
const timingParserToSeconds = require('./4-5-timer-parser');
const stringTiming = process.argv;
const notifier = require('node-notifier');

isCheck(stringTiming) && setTimeout(() => {
    notifier.notify({
  title: 'Alarm notification!',
  message: 'Alarm time is run out! Wake up!'
});
}, timingParserToSeconds(stringTiming) * 1000);


