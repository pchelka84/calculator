const screen = document.getElementById('screen');
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const clearAll = document.getElementById('clear-all');
const clearLastEntry = document.getElementById('clear-last');

let isOn = false;
let numberCount = 0;
let enteredNumber = 0;
let firstNumber = 0;
screen.innerHTML = '0'

// Add two numbers
function add(a, b) {
  console.log(a+b);
  return a+b;
}

// Subtract two numbers
function subtract(a, b) {
  console.log(a-b);
  return a-b;
}

// Multiply two numbers
function multiply(a, b) {
  console.log(a*b);
  return a*b;
}

// Divide two numbers
function divide(a, b) {
  console.log(a/b);
  return a/b;
}

// Calls operator function on two numbers
function operate(a, b, operator) {
  switch(operator) {
    case '+':
      add(a, b);
      break;
    case '-':
      subtract(a, b);
      break;
    case '*':
      multiply(a, b);
      break;
    case('/'):
      divide(a, b);
      break; 
  } 
}

// Display numbers on the screen
function displayNumber() {
  const number = this.dataset.number;
  if (numberCount === 0) screen.innerHTML = '';

  if (numberCount <= 9) {
    screen.innerHTML+= number;
    numberCount++;
    enteredNumber = parseInt(screen.innerHTML);
  }
 
  return enteredNumber;
}


// Save operation type
function saveOperation() { 
  firstNumber = enteredNumber;
  const operation = this.dataset.operation;  
  enteredNumber = 0;
  numberCount = 0; 
  return operation;
}


// Event Listeners 
numbers.forEach(number => number.addEventListener('click', displayNumber));
operations.forEach(operation => operation.addEventListener('click', saveOperation)); 


