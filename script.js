const screen = document.getElementById('screen');
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equal = document.getElementById('equal');
const clearAll = document.getElementById('clear-all');
const clearLast = document.getElementById('clear-last');
const point =document.getElementById('point');

let digitCount = 0;
let operationCount = 0;
let enteredNumber = null;
let firstNumber = null;
let operation = null;
let res = null;
screen.innerHTML = '0';

// Add two numbers  
function add(a, b) {
  console.log(a+b);
  return Math.round((a+b) * 1000) / 1000;
}

// Subtract two numbers
function subtract(a, b) {
  console.log(a-b);
  return Math.round((a-b) * 1000) / 1000;
}

// Multiply two numbers
function multiply(a, b) {
  console.log(a*b);
  return Math.round((a*b) * 1000) / 1000;
}

// Divide two numbers
function divide(a, b) {
  if (b === 0) {
    digitCount = 0;  
    point.disabled = false;
    operationCount = 0;
    res = null;
    return screen.innerHTML=`ERR`;  
  } else {
    return parseFloat(Math.round((a/b) * 1000) / 1000);
  } 
}

// Call operator function on two numbers
function operate(a, b, operator) {
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
 
  console.log(`Operate after: Result: ${res}, first number ${firstNumber}, enteredNumber ${enteredNumber}, digit count ${digitCount}, operation ${operation}, operation count ${operationCount}`);

}

// Display numbers on the screen
function displayNumber() { 
  res = null;
  // Dispaly nothing if entered nothing or result is 0
  if (digitCount === 0 || res === 0 ) screen.innerHTML = '';

  const digit = this.dataset.number;

  limitNumberOfDigits(digit);

  console.log(`Display Number: Entered number: ${enteredNumber}, first number ${firstNumber}, digit count ${digitCount}, res = ${res}, operator ${operation}, operation count ${operationCount}`); 
  return enteredNumber;
}

// Limit number of digits on the screen
function limitNumberOfDigits(digit) {
  
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

  console.log(`Limit number of digits: Entered number: ${enteredNumber}, first number ${firstNumber}, digit count ${digitCount}, res = ${res}, operator ${operation}, operation count ${operationCount}`); 
  return enteredNumber;
}

// Keyboard entry
function keyboardEntry(e) {
  console.log(e.key)
  if (e.key >= 0 && e.key <= 9) {
    if (digitCount === 0) screen.innerHTML = '';
    limitNumberOfDigits(e.key)
  };
  // // Doesn't support operations keys yet (Shift)
  // if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') saveOperation();
  if (e.key === 'Enter') evaluate();
  if (e.key === 'Delete' || e.key === 'Escape') clearAllVariables();
  if (e.key === 'Backspace') clearLastEntry();

  
}

// Save operation type and do operation 
function saveOperation(e) {
  operationCount++;   

  // Check if result === 'ERR'
  if (res === 'ERR') res = null;

  // Check if it is first operation  
  if (operationCount === 1) {
    firstNumber = enteredNumber; 

    // if it is not first operation, operate and make prev result firstnumber
  } else {
    operate(firstNumber, enteredNumber, operation);
    firstNumber = res; 
  }
  // operation = this.dataset.operation;
  e.key ? operation = e.key : operation = this.dataset.operation;
  enteredNumber = null;
  digitCount = 0; 
  point.disabled = false;

  console.log(`Save operation: Entered number: ${enteredNumber}, first number: ${firstNumber}, digit count: ${digitCount}, operation: ${operation}, operation count ${operationCount}, res ${res}`);
}

// Clear last entered number or operation
// Clearing result witll reset calculator to start
function clearLastEntry() {

  // Remove operation if entered
  if (operation && !enteredNumber) { 
    enteredNumber = firstNumber;
    firstNumber = null;
    operationCount--;
    operation = null; 
    screen.innerHTML = enteredNumber;

    // Remove second number
  } else if (firstNumber && enteredNumber) {
    enteredNumber = null;
    screen.innerHTML = firstNumber;
    digitCount = 0;  

    // Remove entered/first number
  } else if (enteredNumber && !firstNumber && !res) { 
    enteredNumber = null;
    screen.innerHTML = '0';
    digitCount = 0; 
    
    // Clear all to start if there is already res
  } else if (res) {
    clearAllVariables();
  }
}

// Calculate result when '=' clicked
function evaluate() { 
  operate(firstNumber, enteredNumber, operation); 
  // Check if nothing entered and '=' clicked 
  if (!enteredNumber && !firstNumber) {
    screen.innerHTML = '0';
    enteredNumber = null; 
    digitCount = 0;
    // If only one number entered and '=' clicked
  } else if (!firstNumber) { 
    screen.innerHTML = enteredNumber;
  } else {
    screen.innerHTML = res;
    firstNumber = null;
    enteredNumber = null;
    digitCount = 0; 
    operation = null; 
  }   
}

// Clear all and start clean
function clearAllVariables() {
  digitCount = 0;
  point.disabled = false; 
  operationCount = 0;
  enteredNumber = null;
  firstNumber = null;
  operation = null;
  res = null; 
  screen.innerHTML = '0';
  console.log('All cleared')
}

 
// Event Listeners 
numbers.forEach(number => number.addEventListener('click', displayNumber));
operations.forEach(operation => operation.addEventListener('click', saveOperation)); 
equal.addEventListener('click', evaluate); 
clearAll.addEventListener('click', clearAllVariables);
clearLast.addEventListener('click', clearLastEntry);
window.addEventListener('keydown', keyboardEntry);




