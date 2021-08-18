const screen = document.getElementById('screen');
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equal = document.getElementById('equal');
const clearAll = document.getElementById('clear-all');
const clearLast = document.getElementById('clear-last');
const point = document.getElementById('point');

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
 
  if (e.key >= 0 && e.key <= 9) {
    if (digitCount === 0) screen.innerHTML = '';
    limitNumberOfDigits(e.key)
  };

  if (e.key === 'Enter') evaluate();
  if (e.key === 'Delete' || e.key === 'Escape') clearAllVariables();
  if (e.key === 'Backspace') clearLastEntry();
  if (e.key === '.') document.getElementById('point').click();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    checkOperationCount();

    operation = e.key;
    enteredNumber = null;
    digitCount = 0;
    point.disabled = false; 
  }
}

function saveOperator() { 
  checkOperationCount();

  operation = this.dataset.operation;
  enteredNumber = null;
  digitCount = 0;
  point.disabled = false;
}

function checkOperationCount() { 
  operationCount++; 

  // Check if it is first operation 
  if (operationCount === 1) {
    firstNumber = enteredNumber;
  } else {
    operate(firstNumber, enteredNumber, operation);
    firstNumber = res;
  }
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
    resetEnteredNumber();
    
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
    resetEnteredNumber();

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
  resetEnteredNumber();
  point.disabled = false; 
  operationCount = 0;
  firstNumber = null;
  operation = null;
  res = null;  
  console.log('All cleared')
}

function resetEnteredNumber() {
  enteredNumber = null;
  digitCount = 0;
  screen.innerHTML = '0';
}

 
// Event Listeners 
numbers.forEach(number => number.addEventListener('click', displayNumber));
operations.forEach(operation => operation.addEventListener('click', saveOperator)); 
equal.addEventListener('click', evaluate); 
clearAll.addEventListener('click', clearAllVariables);
clearLast.addEventListener('click', clearLastEntry);
window.addEventListener('keydown', keyboardEntry);




