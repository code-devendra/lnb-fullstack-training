/* Ask user to tell how many days till next sunday. then display how many hours, minutes and
seconds are there in those days */


let daysTillSunday = Number(prompt("Enter the no. of days till sunday : "));
let hours = daysTillSunday * 24;
let minutes = hours * 60;
let seconds = minutes * 60;

console.log("Hours = ", hours, "\nminutes = ", minutes, "\nseconds = ", seconds);