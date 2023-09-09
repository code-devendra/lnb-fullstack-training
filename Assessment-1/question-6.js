/* Ask user to input a number more than 600 and then display square root of that number by 2
places of decimal. */

let num = prompt("Enter a number above 600 : ");
let squareRoot = Math.sqrt(num).toFixed(2);
console.log(squareRoot);