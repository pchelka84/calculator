const screen = document.getElementById('screen');
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equal = document.getElementById('equal');
const clearAll = document.getElementById('clear-all');
const clearLast = document.getElementById('clear-last');
const point =document.getElementById('point');

let digitCount = 0;
let operationCount = 0;
let enteredNumber;
let firstNumber;
screen.innerHTML = '0';
let operation = null;
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
  if (b === 0) {
    digitCount = 0;  
    point.disabled = false;
    return screen.innerHTML=`ERR`;  
  } else {
    return a % b !== 0 ? parseFloat((a/b).toFixed(2)) : a / b;
  } 
}

// Call operator function on two numbers
function operate(a, b, operator) {
  a = firstNumber;
  b = enteredNumber;
  operator = operation;
  // If only one number entered and '=' clicked
  if (!firstNumber) res = enteredNumber;

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
  screen.innerHTML = res;
  firstNumber = res;
  enteredNumber = null;
  console.log(`Operate after: Result: ${res}, first number ${firstNumber}, enteredNumber ${enteredNumber}, digit count ${digitCount}, operation count ${operationCount}`);

}

// Display numbers on the screen
function displayNumber() {
  const digit = this.dataset.number;
  if (digitCount === 0 || res === 0) screen.innerHTML = '';

  // Limit number of digits on the screen
  if (digitCount <= 9) {
    if (digit === ".") {
      screen.innerHTML+= digit;
      point.disabled = true;
    } else {
      screen.innerHTML+= digit; 
    }
    digitCount++; 
    enteredNumber = parseFloat(screen.innerHTML);
  }
  console.log(`Display Number: Entered number: ${enteredNumber}, first number ${firstNumber}, digit count ${digitCount}, res = ${res}, operator ${operation}, operation count ${operationCount}`); 
  return enteredNumber;
}

// Save operation type and do operation 
function saveOperation() {
  operationCount++;    
  if (operationCount === 1) {
    firstNumber = enteredNumber; 
  } else {
    if (res) {
      firstNumber = res;
      res = null;
    } else {
      operate(firstNumber, enteredNumber, operation);
      firstNumber = res; 
      res = null; 
    }
  }
  operation = this.dataset.operation;
  enteredNumber = null;
  digitCount = 0; 
  point.disabled = false;

  console.log(`Save operation: Entered number: ${enteredNumber}, first number: ${firstNumber}, digit count: ${digitCount}, operation: ${operation}, operation count ${operationCount}, res ${res}`);
}

// Clear last entry 
// function clearLastEntry() {
//  if (firstNumber) 
// }

// Clear all and start clean
function clearAllVariables() {
  digitCount = 0;
  point.disabled = false; 
  operationCount = 0;
  enteredNumber = 0;
  firstNumber = 0;
  screen.innerHTML = '0';
  operation ='';
  res = null; 
  console.log('All cleared')
}
 
// Event Listeners 
numbers.forEach(number => number.addEventListener('click', displayNumber));
operations.forEach(operation => operation.addEventListener('click', saveOperation)); 
equal.addEventListener('click', operate); 
clearAll.addEventListener('click', clearAllVariables);
// clearLast.addEventListener('click', clearLastEntry);




