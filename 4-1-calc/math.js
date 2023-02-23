`use strict`
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
    if (b === 0) { 
        console.log(`ERROR-3: Division by zero. Exit`);
        return null };
    return a / b;
};
module.exports = { division, multiply, add, subtraction };
