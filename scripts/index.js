import Calculator from './calculator.js';

const calc = new Calculator();

function processInput(userInput) {
  const displayResult = document.getElementById('result-value');

  calc.input(userInput);
  displayResult.textContent = calc.displayValue;
}

function addEventListeners() {
  const simpleButtons = [];

  // Simple means its textContent can be used as the
  // argument for the Calculator input method.
  simpleButtons.push(document.getElementById('zero-btn'));
  simpleButtons.push(document.getElementById('one-btn'));
  simpleButtons.push(document.getElementById('two-btn'));
  simpleButtons.push(document.getElementById('three-btn'));
  simpleButtons.push(document.getElementById('four-btn'));
  simpleButtons.push(document.getElementById('five-btn'));
  simpleButtons.push(document.getElementById('six-btn'));
  simpleButtons.push(document.getElementById('seven-btn'));
  simpleButtons.push(document.getElementById('eight-btn'));
  simpleButtons.push(document.getElementById('nine-btn'));
  simpleButtons.push(document.getElementById('decimal-btn'));
  simpleButtons.push(document.getElementById('add-btn'));
  simpleButtons.push(document.getElementById('subtract-btn'));
  simpleButtons.push(document.getElementById('equals-btn'));
  simpleButtons.push(document.getElementById('clear-btn'));

  simpleButtons.forEach(button => {
    button.addEventListener('click', () => {
      processInput(button.textContent.trim().toLowerCase());
    });
  });

  // The rest of the buttons are done
  const multiplyBtn = document.getElementById('multiply-btn');
  multiplyBtn.addEventListener('click', () => {
    processInput('*');
  });

  const divideBtn = document.getElementById('divide-btn');
  divideBtn.addEventListener('click', () => {
    processInput('/');
  });

  const allClearBtn = document.getElementById('all-clear-btn');
  allClearBtn.addEventListener('click', () => {
    processInput('a');
  });
  
  const backspaceBtn = document.getElementById('backspace-btn');
  backspaceBtn.addEventListener('click', () => {
    processInput('d');
  });
  
  const flipSignBtn = document.getElementById('flip-sign-btn');
  flipSignBtn.addEventListener('click', () => {
    processInput('!');
  });

  window.addEventListener('keydown', processKeydown);
}

function processKeydown(event) {
  if(/^[0-9.!acd+*=/-]$/.test(event.key)) {
    processInput(event.key);
  }

  if(event.code === 'Backspace') {
    processInput('d');
  }
}

addEventListeners();