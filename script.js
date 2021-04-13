function add(a, b) {
  console.log(a+b);
  return a+b;
}

function subtract(a, b) {
  console.log(a-b);
  return a-b;
}

function multiply(a, b) {
  console.log(a*b);
  return a*b;
}

function divide(a, b) {
  console.log(a/b);
  return a/b;
}

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