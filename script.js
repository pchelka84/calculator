const screen = document.getElementById('screen');
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equal = document.getElementById('equal');
const clearAll = document.getElementById('clear-all');
const clearLastEntry = document.getElementById('clear-last');

let digitCount = 0;
let operationCount = 0;
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
  // return (b === 0) ? screen.innerHTML=`ERR` : (a % b !== 0) ? (a/b).toFixed(2) : a / b; 

  if (b === 0) {
    digitCount = 0;  
    return screen.innerHTML=`ERR`;  
  } else {
    return a % b !== 0 ? (a/b).toFixed(2) : a / b;
  } 
}

// Calls operator function on two numbers
function operate(a, b, operator) {
  a = firstNumber;
  b = enteredNumber;
  operator = operation;

  console.log(`Operate: first number = ${firstNumber}, second number = ${enteredNumber}, operator = ${operation}`)

  switch(operator) {
    case '+':
      res = add(a, b);
      break;
    case '-':
      res = subtract(a, b);
      break;
    case '*':
      res = multiply(a, b); 
      break;
    case('/'):
      res = divide(a, b);
      break; 
  }  
  console.log(`Result: ` + res);
  screen.innerHTML = res;
  return res;
}

// Display numbers on the screen
function displayNumber() {
  const digit = this.dataset.number;
  if (digitCount === 0) screen.innerHTML = '';

  // Limit number of digits on the screen
  if (digitCount <= 9) {
    screen.innerHTML+= digit;
    digitCount++;
    enteredNumber = parseInt(screen.innerHTML);
  }
  console.log(`Entered number: ${enteredNumber}`);
  return enteredNumber;
}

// Save operation type and do operation 
function saveOperation() {
  operationCount++;  
  if (operationCount === 1) {
    firstNumber = enteredNumber; 
  } else {
    operate(firstNumber, enteredNumber, operation);
    firstNumber = res; 
  }
  operation = this.dataset.operation;
  enteredNumber = 0;
  digitCount = 0; 
  console.log(`Entered number: ${enteredNumber}, digit count: ${digitCount}`);

  console.log(`operation: ${operation}`);
}

// Clear all and start clean
function clearAllVariables() {
  digitCount = 0;
  operationCount = 0;
  enteredNumber = 0;
  firstNumber = 0;
  screen.innerHTML = '0';
  operation ='';
  res = null;
}
 
// Event Listeners 
numbers.forEach(number => number.addEventListener('click', displayNumber));
operations.forEach(operation => operation.addEventListener('click', saveOperation)); 
equal.addEventListener('click', operate); 
clearAll.addEventListener('click', clearAllVariables);



