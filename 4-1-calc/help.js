`use strict`
function helpDesk() {

console.log(`
    Hello this is calc documentation:

    calc argument1 argument2 operator
     
     operaror:
     add - addition
     sub - subtract
     div - devision
     mult - myltuply
     
     example:
     call 5 5 add >> 10

     default operator = add
     call 5 5 >> 10
     `);};

module.exports = helpDesk;