const { Worker } = require('worker_threads');
const calculate = require('./calculate');
const coresNumber = 4;
const arraySize = 50_000_000;

process.env.UV_THREADPOOL_SIZE = coresNumber;

let array = [...Array(arraySize).keys()];

const computeOneThread = (array) => {
    performance.mark('start');
    calculate(array);
    performance.mark('end');
    performance.measure('main', 'start', 'end') 
    console.log(performance.getEntriesByName('main'))
}

const computeInWorker = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                arr: array
            }
        });
    worker.on('message', (msg) => {
        console.log(`Worker thread id - ${worker.threadId}`);
        resolve(msg);
        });
    worker.on("error", (msg) => {
        reject(msg);
        });
        worker.on("exit", ()  => {
        console.log('finish thread')
        });
    });
};
const threadArray = (array, coresNumber) => {
    const res = [];
    const chunkSize = Math.ceil(array.length / coresNumber);
    for (let i = 0; i< coresNumber; i++) {
        const chunk = array.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
};

const computeAllThreads =  async (array) => {
   try {
    performance.mark('start');
    splitArr = threadArray(array);
    await Promise.all(splitArr.map(arr => computeInWorker(arr)));
    performance.mark('end');
    performance.measure('threads', 'start', 'end')
    console.log(performance.getEntriesByName('threads'))
} catch (e) {
    console.log(e)
}
};

computeAllThreads(array);