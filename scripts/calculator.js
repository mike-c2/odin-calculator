class Calculator {

  constructor() {
    this.resetCalculator();
  }

  static MAX_DIGITS = 10;
  static MAX_VALUE = Math.pow(10, this.MAX_DIGITS) - 1;
  static MIN_VALUE = this.MAX_VALUE * -1;

  // This does not include the decimal point and negative sign
  static getCountOfNumericalDigits(numberString) {
    return numberString.split('').filter(digit => /^[0-9]$/.test(digit)).length;
  }

  static isStringANumber(numberString) {

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