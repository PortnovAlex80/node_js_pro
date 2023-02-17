const timeSchema = ['h','m','s'];

function isCheck(inputArray) {
   // console.log(inputArray)
    // main chech - is 1-3 args h,m,s
    const lengthArgument = inputArray.length;
    let outputArray = [];
    if (3 > lengthArgument || lengthArgument > 5) {
        console.log(`ERROR ARGS. Code - 1 (many arguments)`)
        return false; // checking error
    };
    // cut argv[0,1]
    [outputArray] = [inputArray.slice(2, lengthArgument)];

    let timeSelector = []; // saving parsing result of prefix - h m s
    let timerValues = [];  // saving parsing result of value = 00 00 00
    let isCorrectHoursMinutesSecondsOrder = false;
    let isCorrectHoursMinutesOrder = false;
    let isCorrectMinutesSecondsOrder = false; 

    // parsing timing values and save in timeValues array
    outputArray.forEach((element, index) => {
        val = element.split("");
        val.pop().toString();
        timerValues[index] = val.join("")
        });
    // parsing timing prefix h m s and save it in timeSelector array
    outputArray.forEach((element, index) => {
        str = element.split("").slice(-1).toString();
        timeSelector[index] = timeSchema.includes(str) && str;
    });
    const timeSelectorLength = timeSelector.length; 
    // 00h 00m 00s is correct
    if (timeSelectorLength === 3) {
        isCorrectHoursMinutesSecondsOrder = timeSelector.every((element, index) => (element === timeSchema[index]));
        //isCorrectHoursMinutesSecondsOrder && timeSelector.forEach(element => element.pop())
        isCorrectTimeSchema = isCorrectHoursMinutesSecondsOrder;
    };
    // 00h 00m and 00m 00s is correct
    isCorrectHoursMinutesOrder = timeSelector.every((element, index) => (element === timeSchema[index]));
    isCorrectMinutesSecondsOrder =  timeSelector.every((element, index) => (element === timeSchema[index+1]));
    if (timeSelectorLength === 2) {
        isCorrectTimeSchema = isCorrectHoursMinutesOrder || isCorrectMinutesSecondsOrder;
        isCorrectHoursMinutesOrder && timerValues.push('00');
        isCorrectMinutesSecondsOrder && timerValues.unshift('00')
        };     
    if (!isCorrectTimeSchema) { 
        console.log('ERROR ARGS. Code - 2 (not valid h/m/s)'); 
         return false};
    // is time schema have dublicates& h-m-m etc
    if (timeSelector.some(value => timeSelector.indexOf(value) !== timeSelector.lastIndexOf(value))) {
        console.log('ERROR ARGS. Code - 3 (dublicates h/m/s)');
        return false;
    }
    // chech hours (0-23) min 0 59 sec 0 59
    if (Number(timerValues[0]) < 0 || Number(timerValues[0]) > 23 
            || Number(timerValues[1] < 0) || timerValues[1]  > 59 
            || Number(timerValues[2] < 0) || timerValues[2]  > 59) {
                console.log('ERROR ARGS. Code - 4 (not correct timing values)');
                return false;
            };
    console.log('All validation is ok. Code - 201');
    return true;
}

module.exports = isCheck;