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

function getCountOfDisplayDigits() {
  const display = document.getElementById('result-value');
  const displayValue = display.textContent;

  return displayValue.replace(/[^0-9]/g, '').length;
}

function addDigitToDisplay(digit) {
  if(isNaN(digit)) {
    return;
  }

  digit = Number(digit);

  if(Math.floor(digit) !== digit || digit < 0 || digit > 9) {
    return
  }

  const display = document.getElementById('result-value');

  if(newNumberEntered && getCountOfDisplayDigits() < MAX_DIGITS
     && (digit !== 0 || display.textContent !== '0')) {
    
    // This prevents things like 000123 from
    // entered into the calculator.
    if(display.textContent === '0') {
      display.textContent = digit.toString();
      
    } else {
      display.textContent += digit.toString();
    }

  } else if(!newNumberEntered) {
    display.textContent = digit.toString();
    newNumberEntered = true;
  }
}

function addEventListeners() {
  const numbers = [];

  numbers.push(document.getElementById('zero-btn'));
  numbers.push(document.getElementById('one-btn'));
  numbers.push(document.getElementById('two-btn'));
  numbers.push(document.getElementById('three-btn'));
  numbers.push(document.getElementById('four-btn'));
  numbers.push(document.getElementById('five-btn'));
  numbers.push(document.getElementById('six-btn'));
  numbers.push(document.getElementById('seven-btn'));
  numbers.push(document.getElementById('eight-btn'));
  numbers.push(document.getElementById('nine-btn'));
  
  for(let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => {
      addDigitToDisplay(numbers[i].textContent);
    });
  }
}

addEventListeners();