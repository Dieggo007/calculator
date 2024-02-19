"use strict"

const numbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1'];
const operators = ['/', '*', '-', '+'];

const currentNumbers = [null, null];
let currentOperator = null;

const operate = {
    '/': () => +currentNumbers[0] / +currentNumbers[1],
    '*': () => +currentNumbers[0] * +currentNumbers[1],
    '-': () => +currentNumbers[0] - +currentNumbers[1],
    '+': () => +currentNumbers[0] + +currentNumbers[1], 
}
const panel = document.querySelector('#panel');
const screen = document.querySelector('#calculator-screen');
const numberPanel = document.querySelector('#number-panel');
const operatorPanel = document.querySelector('#operator-panel');

const createButton = (text) => {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add('calc-button');
    return button; 
}

const numberButtons = [...numbers, '.', '0', '='].map(createButton);
numbers.push('0');
const operatorButtons = operators.map(createButton);

numberPanel.append(...numberButtons);
operatorPanel.append(...operatorButtons);

panel.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const btnText = e.target.innerText;
    if (btnText === 'AC') {
        currentNumbers[0] = null;
        currentNumbers[1] = null;
        currentOperator = null;
        screen.innerText = '0';
        return;
    }
    if (btnText === '=' && currentNumbers[0] !== null && currentNumbers[1] !== null && currentOperator) {
        screen.innerText = operate[currentOperator]();
        currentNumbers[0] = operate[currentOperator]();
        currentNumbers[1] = null;
        currentOperator = null;
        return;
    }
    if (numbers.includes(btnText)) {
        if(currentOperator) {
            currentNumbers[1] = currentNumbers[1] !== null ? currentNumbers[1] + btnText : btnText;
            screen.innerText = currentNumbers[1];
            return;
        }
        currentNumbers[0] = currentNumbers[0] !== null ? currentNumbers[0] + btnText : btnText;
        screen.innerText = currentNumbers[0];
        return;
    }
    if (currentOperator && currentNumbers[1] !== null) {
        screen.innerText = operate[currentOperator]();
        currentNumbers[0] = ""+operate[currentOperator]();
        currentNumbers[1] = null;
        currentOperator = btnText;
        return;
    }
    if (currentOperator || currentNumbers[0] === null) return;
    currentOperator = btnText;
})
