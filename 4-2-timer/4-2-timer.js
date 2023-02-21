const schema = 'hms'.split("");
const [ , , ...stringTiming] = process.argv;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

// isCheck(stringTiming) && setTimeout(() => {
//     console.log('Alarm time is run out! Wake up!')
// }, timingParserToSeconds(stringTiming) * 1000);

const seconds = stringTiming.filter( args => schema.some(hms => args.slice(-1) === (hms)));

const set = new Set(seconds);
set.size !== seconds.length && console.error('Error dublicates');

const timer = seconds.map( hms => {
    const parserValue = Number(hms.split("").slice(0,-1).join(""))
    if (hms === 'h' && (parserValue < 0 || parserValue > 23)) { 
         return parserValue * SECONDS_IN_HOUR 
        };
    if (hms === 'm' && (parserValue < 0 || parserValue > 23)) { 
         return parserValue * SECONDS_IN_MINUTE 
        }; 
    return ((parserValue))
})
console.log(timer)