class Calculator {

  constructor() {
    this.resetCalculator();
  }

  static MAX_DIGITS = 10;
  static MAX_VALUE = Math.pow(10, this.MAX_DIGITS) - 1;
  static MIN_VALUE = this.MAX_VALUE * -1;

  // This does not include the decimal point and negative sign
  static getCountOfNumericalDigits(numberString) {
    if(numberString === Infinity || numberString === -Infinity) {
      return Infinity;
    }

    let numString;

    if(typeof numberString === 'number' && !isNaN(numberString)) {
      numString = numberString.toString();
    } else {
      numString = numberString;
    }

    if(!numString) {
      return 0;
    }

    return numString.split('').filter(digit => /^[0-9]$/.test(digit)).length;
  }

  static isStringANumber(numberString) {
    const numString = numberString + '';

    if(!numString) {
      return false;
    }

    return /^-?[0-9]+(\.[0-9]+)?$/.test(numString) || /^-?\.[0-9]+$/.test(numString);
  }

  resetCalculator() {

  }

  massInput(inputSequenceString) {

  }

  input(char) {

  }

  inputNegativeSign() {

  }

  inputDigit(digitChar) {

  }

  inputEquals() {

  }

  inputOperator(nextOperator) {

  }

  executeOperation() {

  }

  deleteExtraDecimalDigits() {

  }

  deleteLastDigit() {

  }
}

module.exports = Calculator;