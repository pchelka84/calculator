const screen = document.getElementById('screen');
const numbers = document.querySelectorAll('[data-number]');
const clearAll = document.getElementById('clear-all');
const clearLastEntry = document.getElementById('clear-last');


let numberCount = 0;
let enteredNumber = 0;

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

  if (numberCount <= 8) {
    screen.innerHTML+= number;
    numberCount++;
    enteredNumber = parseInt(screen.innerHTML);
  }

  console.log(`Entered number ${enteredNumber}`);
  return enteredNumber;
}

// Event Listeners 
numbers.forEach(number => number.addEventListener('click', displayNumber))
