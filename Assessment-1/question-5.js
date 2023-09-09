/* Ask user their a line from their favourite poem and display number of letters in that line.
Further, as a starting and ending value from user and display subsection of that poem based on
starting and ending value */

let line = prompt("Enter a line from your favourite poem : ");
let startValue = prompt("Enter the starting index value of the subsection you want to display : ");
let endValue = prompt("Enter the ending index value of that subsection : ");

console.log("Total no. of letters in you line is : ", line.length);

console.log("And the subsection you want to display is : ", line.slice(startValue, endValue));