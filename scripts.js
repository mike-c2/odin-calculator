const MAX_DIGITS = 10;

let newNumberEntered;
let operatorSelected;
let displayValue;
let storedValue;

function resetGlobalVariables() {
  newNumberEntered = false;
  operatorSelected = null;
  displayValue = 0;
  storedValue = 0;
}

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

function clearDisplay() {
  const display = document.getElementById('result-value');
  display.textContent = '0';
}

function flipSign() {
  const display = document.getElementById('result-value');
  let displayValue = display.textContent;
  
  if(isNaN(displayValue) || Number(displayValue) === 0) {
    return;
  }
  
  if(displayValue[0] === '-') {
    displayValue = displayValue.slice(1);

  } else {
    displayValue = '-' + displayValue;
  }
  
  display.textContent = displayValue;
}

function processKeydown(event) {
  if(!isNaN(event.key)) {
    addDigitToDisplay(event.key);
  }
  
  if(event.code === 'KeyA') {
    resetGlobalVariables();
    clearDisplay();
  }

  if(event.code === 'KeyC') {
    clearDisplay();
  }
  
  if(event.key === '!') {
    flipSign();
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
  
  const allClearBtn = document.getElementById('all-clear-btn');
  allClearBtn.addEventListener('click', () => {
    resetGlobalVariables();
    clearDisplay();
  });
  
  const clearBtn = document.getElementById('clear-btn');
  clearBtn.addEventListener('click', clearDisplay);
  
  const flipSignBtn = document.getElementById('flip-sign-btn');
  flipSignBtn.addEventListener('click', flipSign);

  window.addEventListener('keydown', processKeydown);
}

resetGlobalVariables();
clearDisplay();
addEventListeners();