function timeInSeconds(timePrefixes) {

return timePrefixes.reduce( (clock, hms) => {  
    const value = Number(hms.split("").slice(0,-1).join(""));
    const prefix = hms.slice(-1);
    if (prefix === 'h') {
        return (value > 0 && value  < 23) ? clock += value * SECONDS_IN_HOUR : errorEmitter.emit('error', 'Hours out range 0..23h');
        };
    if (prefix === 'm') { 
        return (value > 0 && value  < 59) ? clock += value * SECONDS_IN_MINUTE : errorEmitter.emit('error', 'Minuts out range 0..59m');
        };
    return (value > 0 && value  < 59) ? clock += value : errorEmitter.emit('error', 'Seconds out range 0..59m');
    }, 0);
}
module.exports = timeInSeconds;