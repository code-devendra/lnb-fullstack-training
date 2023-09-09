/* Ask user for a total bill and also ask for number of diners, and display share of each diner. */

let totalBill = prompt("Enter the amount of total bill : ");
let numberOfDiners = prompt("Enter the total no. of diners : ");

let equalShare = totalBill / numberOfDiners;
console.log("Each diners has a share of ", equalShare);