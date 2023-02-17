const { parentPort, workerData  } = require('worker_threads')

const compute = ({array}) => {

return array.reduce((total, num) => {
    if (num % 3 === 0) { 
        ++total }
    return total;
    }, 0);
}

parentPort.postMessage(compute(workerData));

