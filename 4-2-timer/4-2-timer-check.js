//  1h 5m 10s
//  00h 00m 00s - 0 - 0 - 0
//  // trim all spaces
//  // check max - 11
//  // min lenght - 2 5m 
//  // split(" ") - 1- 3 elements
// // h m s must be
// // if 1 el - 1 m 
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
    console.log(`out - ${outputArray}`);
    whatIsIt(outputArray);

    
}


function whatIsIt(outputArray){
    console.log('helo')
    const isHours = 'Hours';
    const isMinutes = 'Minutes';
    const isSeconds = 'Seconds';
    let timeSelector = [];
    let isCorrectTimeSchema; 

    outputArray.forEach((element, index) => {
        str = element.split("").slice(-1).toString();
        console.log(`${str} is ${timeSchema.includes(str)}`);
        //if (!timeSchema.includes(str)) {isCorrectTimeSchema = false };
        timeSelector[index] = timeSchema.includes(str) && str;
        //return true;
    });
    const timeSelectorLength = timeSelector.length;
    
    isCorrectTimeSchema = (timeSelector[0])

    // 00h 00m
    // console.log(isCorrectTimeSchema)
    // if (!isCorrectTimeSchema) { 
    //     console.log('ERROR ARGS. Code - 2 (not valid h/m/s)'); 
    //     return false}

    console.log(`timeselector - ${timeSelector} and ${timeSelectorLength}`)
    if (timeSelector.some(value => timeSelector.indexOf(value) !== timeSelector.lastIndexOf(value))) {
        console.log('ERROR ARGS. Code - 3 (dublicates h/m/s)')
    }
}

module.exports = isCheck;
