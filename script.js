const screen = document.querySelector(".screen");
let current_input = '';
let first_operand = null;
let operator = null;

function update_screen(value){
    screen.textContent = value;
}

function handle_input(num){
    current_input += num;
    update_screen(current_input);
}

function handle_operator(op){
    if (first_operand === null){
        first_operand = parseFloat(current_input);
    } else if (operator) {
        first_operand = calculate(first_operand, parseFloat(current_input), operator);
        update_screen(first_operand);
    }
    operator = op;
    current_input = "";

}

function calculate(num1, num2, operator){
    switch(operator){
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        default:
            return num2;
    }
}

function handle_equals(){
    if (operator !== null && current_input !== "") {
        const result = calculate(first_operand, parseFloat(current_input), operator);
        update_screen(result);
        first_operand = result;
        operator = null;
        current_input = "";
    }
}

function handle_clear(){
    current_input = "";
    first_operand = null;
    operator = null;
    update_screen("0");
}

document.querySelectorAll('.calc-button').forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();
        if (!isNaN(value) || value === ".") {
            handle_input(value);
        } else if (value === "+") {
            handle_operator("+");
        } else if (value === "-") {
            handle_operator("-");
        } else if (value === "=") {
            handle_equals();
        } else if (value === "AC") {
            handle_clear();
        }
    });
});

