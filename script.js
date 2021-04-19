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
  // Check if nothing entered and '=' clicked 
  if (!enteredNumber && !firstNumber) {
    screen.innerHTML = '0';
    // If only one number entered and '=' clicked
  } else if (!firstNumber) {
    res = enteredNumber;
    screen.innerHTML = res;
  } else {
    screen.innerHTML = res;
    firstNumber = res;
  }  
  enteredNumber = null;
  operation = null;
  console.log(`Operate after: Result: ${res}, first number ${firstNumber}, enteredNumber ${enteredNumber}, digit count ${digitCount}, operation ${operation}, operation count ${operationCount}`);

}

// Display numbers on the screen
function displayNumber() { 
  // Dispaly nothing if entered nothing or result is 0
  if (digitCount === 0 || res === 0 ) screen.innerHTML = '';

  const digit = this.dataset.number;

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

  // Check if it is first operation  
  if (operationCount === 1) {
    firstNumber = enteredNumber; 

    // if it is not first operation, make prev result firstnumber
  } else {
    operate(firstNumber, enteredNumber, operation);
    firstNumber = res; 
  }
  operation = this.dataset.operation;
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
    screen.innerHTML = `${enteredNumber}`

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

// Clear all and start clean
function clearAllVariables() {
  digitCount = 0;
  point.disabled = false; 
  operationCount = null;
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
equal.addEventListener('click', operate); 
clearAll.addEventListener('click', clearAllVariables);
clearLast.addEventListener('click', clearLastEntry);




