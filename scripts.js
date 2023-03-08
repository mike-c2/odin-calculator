const MAX_DIGITS = 10;

const MAX_VALUE = Math.pow(10, MAX_DIGITS) - 1;
const MIN_VALUE = MAX_VALUE * -1;

let newNumberEntered;
let operatorSelected;
let storedValue;

function resetGlobalVariables() {
  newNumberEntered = false;
  operatorSelected = add;
  document.getElementById('result-value').textContent = '0';
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

function enterEquals() {
  const display = document.getElementById('result-value');
  const displayValue = display.textContent;
  
  if(isNaN(displayValue)) {
    return;
  }
  
  const newOperand = Number(displayValue);
  const result = operatorSelected(storedValue, newOperand);

  if(result === null) {
    display.textContent = 'div by 0!';
    return;
  }
  
  if(result < MIN_VALUE || result > MAX_VALUE) {
    display.textContent = 'overflow';
    return;
  }
  
  if(newNumberEntered) {
    storedValue = newOperand;
    newNumberEntered = false;
  }
  
  let resultString = result.toString();
  let maxLength = MAX_DIGITS;
  const decimalIndex = resultString.search(/\./);
  
  if(decimalIndex >= 0) {
    maxLength++;
  }
  
  if(resultString[0] === '-') {
    maxLength++;
  }
  
  if(resultString.length > maxLength) {
    const integerString = resultString.replace(/\..*$/, '').replace(/-/, '');
    const allowedDecimals = MAX_DIGITS - integerString.length;

    display.textContent = result.toFixed(allowedDecimals);

  } else {
    display.textContent = resultString;
  }
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
    storedValue = Number(display.textContent);
    newNumberEntered = true;
    display.textContent = digit.toString();
  }
}

function clearDisplay() {
  const display = document.getElementById('result-value');
  display.textContent = '0';
}

function deleteSingleDigit() {
  const display = document.getElementById('result-value');
  const displayValue = display.textContent;
  
  if(isNaN(displayValue) || displayValue === '0') {
    return;
  }

  const displayNumber = Number(displayValue);
  
  if(newNumberEntered && displayNumber > -10 && displayNumber < 10
    && displayValue.search(/\./) < 0) {

    clearDisplay();

  } else if(newNumberEntered) {
    display.textContent = displayValue.slice(0, -1);
  }
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

function enterDecimal() {
  const display = document.getElementById('result-value');
  let displayValue = display.textContent;
  
  if(isNaN(displayValue) || displayValue.search(/\./) >= 0
    || getCountOfDisplayDigits() >= MAX_DIGITS) {

    return
  }
  
  if(newNumberEntered) {
    display.textContent += '.';

  } else {
    newNumberEntered = true;
    display.textContent = '0.';
  }
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
  
  if(event.code === 'Backspace') {
    deleteSingleDigit();
  }
  
  if(event.key === '!') {
    flipSign();
  }
  
  if(event.key === '.') {
    enterDecimal();
  }
  
  if(event.key === '=') {
    enterEquals();
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
  
  const backspaceBtn = document.getElementById('backspace-btn');
  backspaceBtn.addEventListener('click', deleteSingleDigit);
  
  const flipSignBtn = document.getElementById('flip-sign-btn');
  flipSignBtn.addEventListener('click', flipSign);
  
  const decimalBtn = document.getElementById('decimal-btn');
  decimalBtn.addEventListener('click', enterDecimal);
  
  const equalsBtn = document.getElementById('equals-btn');
  equalsBtn.addEventListener('click', enterEquals);

  window.addEventListener('keydown', processKeydown);
}

resetGlobalVariables();
clearDisplay();
addEventListeners();