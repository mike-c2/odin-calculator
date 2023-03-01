const MAX_DIGITS = 10;
let newNumberEntered = false;
let isDisplayError = false;
let operatorSelected = null;
let displayValue = 0;
let storedValue = 0;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if(b === 0) {
    return null;
  }
  
  return a / b;
}