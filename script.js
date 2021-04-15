const screen = document.getElementById('screen');
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equal = document.getElementById('equal');
const clearAll = document.getElementById('clear-all');
const clearLastEntry = document.getElementById('clear-last');

let digitCount = 0;
let enteredNumber = 0;
let firstNumber = 0;
screen.innerHTML = '0';
let operation ='';
let res = null;

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
  return (b === 0) ? screen.innerHTML=`ERR` : a/b;;
  // console.log(a/b);
}

// Calls operator function on two numbers
function operate(a, b, operator) {
  a = firstNumber;
  b = enteredNumber;
  operator = operation;

  console.log(`first number = ${firstNumber}, second number = ${enteredNumber}, operator = ${operation}`)

  switch(operator) {
    case '+':
      res = add(a, b);
      screen.innerHTML=`${res}`;
      break;
    case '-':
      res = subtract(a, b);
      screen.innerHTML=`${res}`; 
      break;
    case '*':
      res = multiply(a, b);
      screen.innerHTML=`${res}`;

      break;
    case('/'):
      res = divide(a, b);
      screen.innerHTML=`${res}`;
      break; 
  } 
}

// Display numbers on the screen
function displayNumber() {
  const digit = this.dataset.number;
  if (digitCount === 0) screen.innerHTML = '';

  if (digitCount <= 9) {
    screen.innerHTML+= digit;
    digitCount++;
    enteredNumber = parseInt(screen.innerHTML);
  }
 
  return enteredNumber;
}


// Save operation type
function saveOperation() { 
  firstNumber = enteredNumber;
  operation = this.dataset.operation;  
  enteredNumber = 0;
  digitCount = 0; 
  console.log(`operation: ${operation}`)
}


// Event Listeners 
numbers.forEach(number => number.addEventListener('click', displayNumber));
operations.forEach(operation => operation.addEventListener('click', saveOperation)); 
equal.addEventListener('click', operate);


