function add(a,b) {
    return a + b;
};

function subtraction(a,b) {
    return a - b;
};

function multiply(a,b) {
    return a * b;
};

function division(a,b) {
    if (b === 0) { return false };
    return a / b;
};

module.exports = { division, multiply, add, subtraction };
