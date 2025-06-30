const display = document.getElementById('result')
const buttonsContainer = document.querySelector('.buttons')

let currentInput = '0';
let operator = null;
let previousInput = null;
let waitingForNewInput = false;

function updateDisplay (value) {
    display.value = value
}

function appendNumber (number) {
    if (waitingForNewInput) {
        currentInput = number;
        waitingForNewInput = false;
    } else {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else if (number === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += number;
        }   
    }
    updateDisplay(currentInput);
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput)
    
    if (operator && !waitingForNewInput) {
        const result = calculate(previousInput, inputValue, operator)
        currentInput = String(result)
        updateDisplay(currentInput)
        previousInput = result;
    } else if (previousInput === null) {
        previousInput = inputValue;
    } 
    waitingForNewInput = true;
    operator = nextOperator;
}

function calculateResult () {
    if (operator === null || previousInput === null) {
        return;
    }
    const currentInputValue = parseFloat (currentInput);

    let secondOperand = currentInputValue;
    if (waitingForNewInput) {
        secondOperand = previousInput;
    }

    const result = calculate(previousInput, secondOperand, operator);

    currentInput = String(result)
    updateDisplay(currentInput)
    operator = null
    waitingForNewInput = false
}

function calculate (num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '÷':
            if (num2 === 0) {
                alert("Não é possível dividir por zero!");
                return 'Erro';
            }
            return num1 / num2;
        default:
            return num2;
    }
}

function clearResult () {
    currentInput = '0';
    operator = null;
    previousInput = null;
    waitingForNewInput = false;
    updateDisplay ('0')
}

updateDisplay ('0')

buttonsContainer.addEventListener('click', (event) => {
    const clickedButton = event.target
    
    if (clickedButton.tagName === 'BUTTON') {
        const buttonText = clickedButton.textContent;

        if (buttonText === 'C') {
            clearResult();
        } else if (buttonText === '='){
            calculateResult();
        } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '÷') {
            handleOperator(buttonText);
        } else {
            appendNumber(buttonText);
        }
    }
});
