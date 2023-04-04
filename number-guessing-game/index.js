"use strict";

let randomNumber = Math.trunc(Math.random() * 100 + 1);
let chances = 10;

function isYouWin(msg, borderStyle, sub_msg) {
    document.querySelector(".message").textContent = msg;
    document.querySelector(".number").textContent = `${randomNumber}`;
    document.querySelector(".match").setAttribute("disabled", "");
    document.querySelector("button").classList.add("disable");
    document.querySelector(".container").style.border = borderStyle;
    document.querySelector(".msg-score").textContent = sub_msg;
}

document.querySelector(".match").addEventListener("click", function () {
    const userNumber = Number(document.querySelector(".guess").value);
    if (userNumber) {
        if (chances >= 1) {
            if (userNumber > randomNumber) {
                document.querySelector(".message").textContent = "Guess lower";
            } else if (userNumber < randomNumber) {
                document.querySelector(".message").textContent = "Guess higher";
            } else {
                isYouWin("😃 YOU WIN! CONGRATULATIONS 😃", "7px dashed green", "Good Job!!");
            }
        } else {
            isYouWin("😥 YOU LOSS 😥", "7px dashed red", "Better Luck Next Time!!");
        }
        chances--;
        if (chances >= 0)
            document.querySelector(".score").textContent = `${chances}`;
    } else {
        document.querySelector(".message").textContent = "😠Please Enter a value before checking😠";
    }

});

document.querySelector(".again").addEventListener('click', function () {
    chances = 10;
    randomNumber = Math.trunc(Math.random() * 100 + 1);
    document.querySelector(".number").textContent = "??";
    document.querySelector(".guess").value = "";
    document.querySelector(".match").removeAttribute("disabled");
    document.querySelector("button").classList.remove("disable");
    document.querySelector(".message").textContent = "Let's Start";
    document.querySelector(".msg-score").innerHTML = `You have <span class="score">10</span> chances left`;
    document.querySelector(".container").style.border = "none";
});