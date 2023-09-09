/* Generate a lucky number upto 10 and prompt user to guess the number */

let luckyNumber = Math.trunc(Math.random() * 10 + 1);
let guess = prompt("Guess the number from 1 to 10 : ");

if (luckyNumber == guess) {
    console.log("You guess the correct number. Congrats :)");
} else {
    console.log("Your guess is incorrect :(");
}