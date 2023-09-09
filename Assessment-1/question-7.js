/* Randomly toss a coin and ask user heads or tails, if its head display U win else display bad
luck. (Assign two random numbers as head / tail) */

// 0 == head
// 1 == tail
let tossResult = Math.trunc(Math.random() * 2);
let userGuess = prompt("The coin is tossed as random. You need to guess between the head as 0 and tail as 1 : ");
if (tossResult == userGuess) {
    console.log("You win the toss");
} else {
    console.log("Bad luck");
}