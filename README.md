const { Worker, performance } = require('worker_threads');

process.env.UV_THREADPOOL_SIZE = 4;

let array = [];

const compute = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                array: [...array]
            }
        });

        worker.on('message', (msg) => {
            console.log(`Worker thread id - ${worker.threadId}`);
            resolve(msg.result);
        });

        worker.on("error", (err) => {
            reject(err.message);
        });

        worker.on("exit", () => {
            console.log('finish thread')
        });
    });
};

const main = async () => {
    try {
        performance.mark('start');
        for (let i = 0; i < 1600000; ++i) {
            array.push(i);
        }
        const result = await compute(array);
        console.log(result);
        performance.mark('end');
        performance.measure('main', 'start', 'end');
        console.log(performance.getEntriesByName('main'));
    } catch (e) {
        console.log(e)
    }
};

main();
