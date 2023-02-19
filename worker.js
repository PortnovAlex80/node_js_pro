const { parentPort, workerData  } = require('worker_threads');
const calculate = require('./calculate');

parentPort.postMessage(calculate(workerData));

