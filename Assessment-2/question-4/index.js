
document.querySelector("button").addEventListener("click", function () {
    let cal_value = document.getElementById("selection").value;
    let num1 = Number(document.getElementById("first-num").value);
    let num2 = Number(document.getElementById("second-num").value);
    let answer = 0;
    switch (cal_value) {
        case "add":
            answer = num1 + num2;
            break;
        case "sub":
            answer = num1 - num2;
            break;
        case "mul":
            answer = num1 * num2;
            break;
        case "div":
            answer = num1 / num2;
            break;

        default:
            break;
    }
    document.querySelector(".ans").textContent = answer;
});
