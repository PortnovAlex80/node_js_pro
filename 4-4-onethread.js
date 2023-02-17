let array = [];
process.env.UV_THREADPOOL_SIZE = 2;
const main =  () => {
    performance.mark('start');
    for (let i = 0; i <1600000; ++i) {
        array.push(i)};
    const result = compute(array);
    //console.log(result)
    performance.mark('end');
    performance.measure('main', 'start', 'end')
}

const compute = (array) => {
    return array.map((x) => (Math.random() > 0.5 ? x * 2 : x/ 3));

    
    return array.reduce((total, num) => {
        if (num % 3 === 0) { 
        ++total }
        return total;
    }, 0);

};

main()
console.log(performance.getEntriesByName('main'))

