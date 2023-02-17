const { Worker } = require('worker_threads')

let array = [];

const compute = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                array
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

const main =  async () => {
   try {
   
    performance.mark('start');
    for (let i = 0; i <600000; ++i) {
        array.push(i)};
    console.log(await compute(array))
     
    const result = await Promise(compute(array));
    console.log(result)
    
    performance.mark('end');
    performance.measure('main', 'start', 'end')
    console.log(performance.getEntriesByName('main'))
} catch (e) {
    console.log(e)
}
};

main()

