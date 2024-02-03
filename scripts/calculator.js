class Calculator {

  constructor() {
    this.resetCalculator();
  }

  static MAX_DIGITS = 10;
  static MAX_VALUE = Math.pow(10, this.MAX_DIGITS) - 1;
  static MIN_VALUE = this.MAX_VALUE * -1;

  // This does not include the decimal point and negative sign
  static getCountOfNumericalDigits(numberString) {
    if (numberString === Infinity || numberString === -Infinity) {
      return Infinity;
    }

    let numString;

    if (typeof numberString === 'number' && !isNaN(numberString)) {
      numString = numberString.toString();
    } else {
      numString = numberString;
    }

    if (!numString) {
      return 0;
    }

    return numString.split('').filter(digit => /^[0-9]$/.test(digit)).length;
  }

  static isStringANumber(numberString) {
    const numString = numberString + '';

    return /^-?[0-9]+\.?[0-9]*$/.test(numString) || /^-?\.[0-9]+$/.test(numString);
  }

  resetCalculator() {
    this.leftOperand = null;
    this.rightOperand = null;
    this.operator = null;
    this.displayValue = "0";
    this.resetDisplayValue = false;
  }

  /*
    This is used for testing the input method.

    Lets you feed it a whole string instead of
    just one character at a time.
  */
  massInput(inputSequenceString) {
    if (!inputSequenceString && inputSequenceString !== 0) {
      return;
    }

    let inputString = inputSequenceString + '';

    inputString.split('').forEach(char => {
      this.input(char)
    });
  }

  input(char) {
    if (typeof char !== 'string' && typeof char !== 'number') {
      return;
    }

    // Convert numbers into strings before converting.
    const character = `${char}`.toLowerCase();

    if (character === 'a') {
      this.resetCalculator();
      return;
    }

    if (!Calculator.isStringANumber(this.displayValue)) {
      return;
    }

    if ((character === 'c' || character === 'd') && this.resetDisplayValue) {
      this.inputDigit('0');
      return;
    }

    if (character === 'c') {
      this.displayValue = '0';
      return;
    }

    if (character === 'd') {
      this.deleteLastDigit();
      return;
    }

    if (character === '!') {
      this.inputNegativeSign();
      return;
    }

    if (/^[0-9.]$/.test(character)) {
      this.inputDigit(character);
      return;
    }

    if (character === '=') {
      this.inputEquals();
      return;
    }

    if (character === '+' || character === '-' || character === '*' || character === '/') {
      this.inputOperator(character);
      return;
    }
  }

  inputNegativeSign() {
    if (!+this.displayValue) {
      return;
    }

    this.displayValue += ''; // keeping the type consistent

    if (+this.displayValue === 0) { // there is no -0
      return;
    }

    if (+this.displayValue < 0) {
      this.displayValue = this.displayValue.slice(1);
    } else if (+this.displayValue > 0) {
      this.displayValue = '-' + this.displayValue;
    }

    if (this.resetDisplayValue && this.leftOperand !== null) {
      this.leftOperand = +this.displayValue;
    }
  }

  inputDigit(digitChar) {
    const digit = digitChar + '';

    if (!(/^[0-9.]$/.test(digitChar) && Calculator.isStringANumber(this.displayValue))) {
      return;
    }

    if (this.resetDisplayValue) {
      this.leftOperand = this.rightOperand;
      this.rightOperand = +this.displayValue;
      this.displayValue = '0';
      this.resetDisplayValue = false;
    }

    if (digit !== '.' && this.displayValue === '0') {
      this.displayValue = digit;
      return;
    }

    // Cannot enter a decimal point if one already is present
    if (digit === '.' && /\./.test(this.displayValue)) {
      return;
    }

    if (Calculator.getCountOfNumericalDigits(this.displayValue) >= Calculator.MAX_DIGITS) {
      return;
    }

    this.displayValue += digit;
  }

  inputOperator(operatorChar) {
    const newOperator = operatorChar + '';

    if (!(/^[-+*/]$/.test(newOperator) && Calculator.isStringANumber(this.displayValue))) {
      return;
    }

    this.operator = newOperator;

    if(!this.resetDisplayValue) {
      this.resetDisplayValue = true;
      this.inputEquals();
    }
  }

  inputEquals() {

  }

  fixDecimalDigits() {
    if (!Calculator.isStringANumber(this.displayValue)) {
      return;
    }

    // Eliminate preceding and succeeding '0' digits,
    // such as '0005.7000', which becomes be '5.7'.
    let numberString = +this.displayValue;
    numberString = numberString.toString();

    if (Calculator.getCountOfNumericalDigits(numberString) <= Calculator.MAX_DIGITS) {
      this.displayValue = numberString;
      return;
    }

    let integerPart;
    let integerPartDigitCount;
    let decimalPart;
    let decimalPartDigitCount;

    [integerPart, decimalPart] = numberString.split('.');

    integerPartDigitCount = Calculator.getCountOfNumericalDigits(integerPart);
    decimalPartDigitCount = Calculator.getCountOfNumericalDigits(decimalPart);

    if (integerPartDigitCount > Calculator.MAX_DIGITS) {
      this.displayValue = 'Overflow';
      return;
    }

    const numberOfDecimalDigitsAllowed = Calculator.MAX_DIGITS - integerPartDigitCount;

    let newNumber = +numberString
    // Back and forth converting to remove decimal 0's a the end,
    // for example '5.500' becomes '5.5'
    newNumber = +newNumber.toFixed(numberOfDecimalDigitsAllowed);
    this.displayValue = newNumber.toString();
  }

  deleteLastDigit() {
    if (!Calculator.isStringANumber(this.displayValue)) {
      return;
    }

    this.displayValue += '';

    if (/^-?[0-9]$/.test(this.displayValue)) {
      this.displayValue = '0';
      return;
    }

    this.displayValue = this.displayValue.slice(0, -1);
  }
}

module.exports = Calculator;