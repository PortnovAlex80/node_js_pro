let array = [];

const main =  () => {
    performance.mark('start');
    for (let i = 0; i <600000; ++i) {
        array.push(i)};
    const result = compute(array);
    console.log(result)
    performance.mark('end');
    performance.measure('main', 'start', 'end')
}

const compute = (array) => {
    return array.reduce((total, num) => {
        if (num % 3 === 0) { 
        ++total }
        return total;
    }, 0);

};

main()
console.log(performance.getEntriesByName('main'))

