function add(a,b) {
    return a + b;
};

function subtraction(a,b) {
    return a - b;
};

function multiply(a,b) {
    return a * b;
};

function devision(a,b) {
    if (b === 0) { return false };
    return a / b;
};

module.exports = { devision, multiply, add, subtraction };
