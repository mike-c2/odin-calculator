const Calculator = require('./calculator');

describe('Tests getCountOfNumericalDigits(numberString)', () => {
  test("'0' has 1 digit", () => {
    expect(Calculator.getCountOfNumericalDigits('0')).toBe(1);
  });

  test("'3' has 1 digit", () => {
    expect(Calculator.getCountOfNumericalDigits('3')).toBe(1);
  });

  test("'32' has 2 digits", () => {
    expect(Calculator.getCountOfNumericalDigits('32')).toBe(2);
  });

  test("'1234567890' has 10 digits", () => {
    expect(Calculator.getCountOfNumericalDigits('1234567890')).toBe(10);
  });

  test("'5.01' has 3 digits (decimals do not count)", () => {
    expect(Calculator.getCountOfNumericalDigits('5.01')).toBe(3);
  });

  test("'-567' has 3 digits (negative sign does not count)", () => {
    expect(Calculator.getCountOfNumericalDigits('-567')).toBe(3);
  });

  test("'-567.89' has 5 digits", () => {
    expect(Calculator.getCountOfNumericalDigits('-567.89')).toBe(5);
  });

  test('Empty string has 0 digits', () => {
    expect(Calculator.getCountOfNumericalDigits('')).toBe(0);
  });

  test('0 has 1 digit', () => {
    expect(Calculator.getCountOfNumericalDigits(0)).toBe(1);
  });

  test('-5 has 1 digit', () => {
    expect(Calculator.getCountOfNumericalDigits(-5)).toBe(1);
  });

  test('-9.99 has 3 digits', () => {
    expect(Calculator.getCountOfNumericalDigits(-9.99)).toBe(3);
  });

  test('infinity has infinite digits', () => {
    expect(Calculator.getCountOfNumericalDigits(Infinity)).toBe(Infinity);
  });

  test('-infinity has infinite digits', () => {
    expect(Calculator.getCountOfNumericalDigits(-Infinity)).toBe(Infinity);
  });

  test('NaN has 0 digits', () => {
    expect(Calculator.getCountOfNumericalDigits(NaN)).toBe(0);
  });

  test('null has 0 digits', () => {
    expect(Calculator.getCountOfNumericalDigits(null)).toBe(0);
  });

  test('undefined has 0 digits', () => {
    expect(Calculator.getCountOfNumericalDigits(undefined)).toBe(0);
  });
});

describe('Tests isStringANumber(numberString)', () => {
  test("'0' is true", () => {
    expect(Calculator.isStringANumber('0')).toBe(true);
  });

  test("'8' is true", () => {
    expect(Calculator.isStringANumber('8')).toBe(true);
  });

  test("'99999999999999' is true", () => {
    expect(Calculator.isStringANumber('99999999999999')).toBe(true);
  });

  test("'-45.77' is true", () => {
    expect(Calculator.isStringANumber('-45.77')).toBe(true);
  });

  test("'.5' is true", () => {
    expect(Calculator.isStringANumber('.5')).toBe(true);
  });

  test("'-.01' is true", () => {
    expect(Calculator.isStringANumber('-.01')).toBe(true);
  });

  test("'12.' is true", () => {
    expect(Calculator.isStringANumber('12.')).toBe(true);
  });

  test("'-45.x77' is false", () => {
    expect(Calculator.isStringANumber('-45.x77')).toBe(false);
  });

  test("'a777' is false", () => {
    expect(Calculator.isStringANumber('a777')).toBe(false);
  });

  test('Empty string is false', () => {
    expect(Calculator.isStringANumber('')).toBe(false);
  });

  test("'cat' is false", () => {
    expect(Calculator.isStringANumber('cat')).toBe(false);
  });

  test('0 is true', () => {
    expect(Calculator.isStringANumber(0)).toBe(true);
  });

  test('7.777 is true', () => {
    expect(Calculator.isStringANumber(7.777)).toBe(true);
  });

  test('-9.0 is true', () => {
    expect(Calculator.isStringANumber(-9.0)).toBe(true);
  });

  test('null is false', () => {
    expect(Calculator.isStringANumber(null)).toBe(false);
  });

  test('NaN is false', () => {
    expect(Calculator.isStringANumber(NaN)).toBe(false);
  });

  test('undefined is false', () => {
    expect(Calculator.isStringANumber(undefined)).toBe(false);
  });
});

describe('Tests resetCalculator', () => {
  test('Reset the calculator properties', () => {
    const calc = new Calculator();
    calc.leftOperand = 5;
    calc.rightOperand = 6;
    calc.operator = '-';
    calc.displayValue = '123';
    calc.resetDisplayValue = false;
    calc.resetCalculator();

    expect(calc.leftOperand).toBe(0);
    expect(calc.rightOperand).toBe(0);
    expect(calc.operator).toBe('+');
    expect(calc.displayValue).toBe('0');
    expect(calc.resetDisplayValue).toBe(true);
  });
});

describe('Tests massInput(inputSequenceString)', () => {
  test('Empty string is ignored', () => {
    const calc = new Calculator();
    const mockInput = jest.spyOn(calc, 'input').mockImplementation(jest.fn());

    calc.massInput('');

    expect(mockInput).toHaveBeenCalledTimes(0);
  });

  test('Null is ignored', () => {
    const calc = new Calculator();
    const mockInput = jest.spyOn(calc, 'input').mockImplementation(jest.fn());

    calc.massInput(null);

    expect(mockInput).toHaveBeenCalledTimes(0);
  });

  test('NaN is ignored', () => {
    const calc = new Calculator();
    const mockInput = jest.spyOn(calc, 'input').mockImplementation(jest.fn());

    calc.massInput(NaN);

    expect(mockInput).toHaveBeenCalledTimes(0);
  });

  test('Undefined is ignored', () => {
    const calc = new Calculator();
    const mockInput = jest.spyOn(calc, 'input').mockImplementation(jest.fn());

    calc.massInput(undefined);

    expect(mockInput).toHaveBeenCalledTimes(0);
  });

  test("'0' is entered", () => {
    const calc = new Calculator();
    const mockInput = jest.spyOn(calc, 'input').mockImplementation(jest.fn());

    calc.massInput('0');

    expect(mockInput).toHaveBeenCalledTimes(1);
    expect(mockInput).toHaveBeenLastCalledWith('0');
  });

  test("' a b c ' is entered", () => {
    const calc = new Calculator();
    const mockInput = jest.spyOn(calc, 'input').mockImplementation(jest.fn());
    const inputString = ' a b c ';

    calc.massInput(inputString);

    expect(mockInput).toHaveBeenCalledTimes(inputString.length);

    inputString.split('').forEach((char, index) => {
      expect(mockInput).toHaveBeenNthCalledWith(index + 1, char);
    });
  });

  test("'1+2=3' is entered", () => {
    const calc = new Calculator();
    const mockInput = jest.spyOn(calc, 'input').mockImplementation(jest.fn());
    const inputString = '1+2=3';

    calc.massInput(inputString);

    expect(mockInput).toHaveBeenCalledTimes(inputString.length);

    inputString.split('').forEach((char, index) => {
      expect(mockInput).toHaveBeenNthCalledWith(index + 1, char);
    });
  });

  test("Many characters entered", () => {
    const calc = new Calculator();
    const mockInput = jest.spyOn(calc, 'input').mockImplementation(jest.fn());
    const inputString = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+/={}[]<>.,;:';

    calc.massInput(inputString);

    expect(mockInput).toHaveBeenCalledTimes(inputString.length);

    inputString.split('').forEach((char, index) => {
      expect(mockInput).toHaveBeenNthCalledWith(index + 1, char);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

describe('Tests input(char)', () => {
  test("'a' (All-Clear) resets calc with error", () => {
    const calc = new Calculator();
    calc.displayValue = 'error';

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('a');

    expect(mockResetCalculator).toHaveBeenCalledTimes(1);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("'A' (All-Clear) resets calc with error", () => {
    const calc = new Calculator();
    calc.displayValue = 'error';

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('A');

    expect(mockResetCalculator).toHaveBeenCalledTimes(1);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("'a' (All-Clear) resets calc with no error", () => {
    const calc = new Calculator();
    calc.displayValue = '5';

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('a');

    expect(mockResetCalculator).toHaveBeenCalledTimes(1);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("'A' (All-Clear) resets calc with no error", () => {
    const calc = new Calculator();
    calc.displayValue = '5';

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('A');

    expect(mockResetCalculator).toHaveBeenCalledTimes(1);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("All valid input, not including All-Clear, are ignored on error", () => {
    const calc = new Calculator();
    calc.displayValue = 'error';

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    const validInputValues = ['c', 'C', 'd', 'D', '!', '+', '-', '*', '/', '=', '.'];
    for (let i = 0; i < 10; i++) {
      validInputValues.push(i);
      validInputValues.push(i.toString());
    }

    validInputValues.forEach(inputValue => calc.input(inputValue));

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("Invalid data are ignored regardless of error", () => {
    const calc = new Calculator();

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    const validInputValues = [null, undefined, NaN, '', ' ', 'cat', {}, '77', 65, Infinity, -Infinity, 'z'];

    calc.displayValue = 'error';
    validInputValues.forEach(inputValue => calc.input(inputValue));

    calc.displayValue = '777';
    validInputValues.forEach(inputValue => calc.input(inputValue));

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("'c' (Clear) calls inputDigit('0') when resetDisplayValue = true", () => {
    const calc = new Calculator();
    calc.displayValue = '567';
    calc.resetDisplayValue = true;

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('c');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(1);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);

    expect(mockInputDigit).toHaveBeenLastCalledWith('0');
  });

  test("'C' (Clear) calls inputDigit('0') when resetDisplayValue = true", () => {
    const calc = new Calculator();
    calc.displayValue = '567';
    calc.resetDisplayValue = true;

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('C');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(1);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);

    expect(mockInputDigit).toHaveBeenLastCalledWith('0');
  });

  test("'d' (Delete Digit) calls inputDigit('0') when resetDisplayValue = true", () => {
    const calc = new Calculator();
    calc.displayValue = '567';
    calc.resetDisplayValue = true;

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('d');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(1);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);

    expect(mockInputDigit).toHaveBeenLastCalledWith('0');
  });

  test("'D' (Delete Digit) calls inputDigit('0') when resetDisplayValue = true", () => {
    const calc = new Calculator();
    calc.displayValue = '567';
    calc.resetDisplayValue = true;

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('D');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(1);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);

    expect(mockInputDigit).toHaveBeenLastCalledWith('0');
  });

  test("'c' (Clear) sets displayValue to '0' when resetDisplayValue = false", () => {
    const calc = new Calculator();
    calc.displayValue = '567';
    calc.resetDisplayValue = false;

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('c');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);

    expect(calc.displayValue).toBe('0');
  });

  test("'C' (Clear) sets displayValue to '0' when resetDisplayValue = false", () => {
    const calc = new Calculator();
    calc.displayValue = '567';
    calc.resetDisplayValue = false;

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('C');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);

    expect(calc.displayValue).toBe('0');
  });

  test("'d' (Delete Digit) calls deleteLastDigit() when resetDisplayValue = false", () => {
    const calc = new Calculator();
    calc.displayValue = '567';
    calc.resetDisplayValue = false;

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('d');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(1);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("'D' (Delete Digit) calls deleteLastDigit() when resetDisplayValue = false", () => {
    const calc = new Calculator();
    calc.displayValue = '567';
    calc.resetDisplayValue = false;

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('D');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(1);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("'!' (Flip +/-) calls inputNegativeSign()", () => {
    const calc = new Calculator();

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('!');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(1);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("Number and decimal digits calls inputDigit()", () => {
    const calc = new Calculator();

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    const digits = ['.'];
    for(let i = 0; i < 10; i++) {
      digits.push(i);
      digits.push(i.toString());
    }

    digits.forEach(digit => calc.inputDigit(digit));

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(digits.length);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);

    digits.forEach((digit, index) => expect(mockInputDigit).toHaveBeenNthCalledWith(index + 1, digit));
  });

  test("'=' calls inputEquals()", () => {
    const calc = new Calculator();

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    calc.input('=');

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(1);
    expect(mockInputOperator).toHaveBeenCalledTimes(0);
  });

  test("Operators calls inputOperator()", () => {
    const calc = new Calculator();

    const mockResetCalculator = jest.spyOn(calc, 'resetCalculator').mockImplementation(jest.fn());
    const mockDeleteLastDigit = jest.spyOn(calc, 'deleteLastDigit').mockImplementation(jest.fn());
    const mockInputNegativeSign = jest.spyOn(calc, 'inputNegativeSign').mockImplementation(jest.fn());
    const mockInputDigit = jest.spyOn(calc, 'inputDigit').mockImplementation(jest.fn());
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    const mockInputOperator = jest.spyOn(calc, 'inputOperator').mockImplementation(jest.fn());

    const operators = ['+', '-', '*', '/'];

    operators.forEach(digit => calc.inputOperator(digit));

    expect(mockResetCalculator).toHaveBeenCalledTimes(0);
    expect(mockDeleteLastDigit).toHaveBeenCalledTimes(0);
    expect(mockInputNegativeSign).toHaveBeenCalledTimes(0);
    expect(mockInputDigit).toHaveBeenCalledTimes(0);
    expect(mockInputEquals).toHaveBeenCalledTimes(0);
    expect(mockInputOperator).toHaveBeenCalledTimes(operators.length);

    operators.forEach((operator, index) => expect(mockInputOperator).toHaveBeenNthCalledWith(index + 1, operator));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

describe('Tests inputNegativeSign', () => {
  test('Empty String is ignored', () => {
    const calc = new Calculator();
    const initialValue = '';
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe(initialValue);
  });

  test('String is ignored', () => {
    const calc = new Calculator();
    const initialValue = 'dog';
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe(initialValue);
  });

  test('Null is ignored', () => {
    const calc = new Calculator();
    const initialValue = null;
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBeNull();
  });

  test('NaN is ignored', () => {
    const calc = new Calculator();
    const initialValue = NaN;
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBeNaN();
  });

  test('Undefined is ignored', () => {
    const calc = new Calculator();
    const initialValue = undefined;
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBeUndefined();
  });

  test("'0' is ignored", () => {
    const calc = new Calculator();
    const initialValue = '0';
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe(initialValue);
  });

  test("0 is ignored", () => {
    const calc = new Calculator();
    const initialValue = 0;
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe(initialValue);
  });

  test("'1' becomes '-1'", () => {
    const calc = new Calculator();
    const initialValue = '1';
    const finalValue = '-1';
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe(finalValue);
  });

  test("2 becomes '-2'", () => {
    const calc = new Calculator();
    const initialValue = 2;
    const finalValue = '-2';
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe(finalValue);
  });

  test("'-900' becomes '900'", () => {
    const calc = new Calculator();
    const initialValue = '-900';
    const finalValue = '900';
    calc.displayValue = initialValue;
    calc.inputNegativeSign();
  });

  test("'999999' becomes '-999999'", () => {
    const calc = new Calculator();
    const initialValue = '999999';
    const finalValue = '-999999';
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe(finalValue);
  });

  test("'1.23' becomes '-1.23'", () => {
    const calc = new Calculator();
    const initialValue = '1.23';
    const finalValue = '-1.23';
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe(finalValue);
  });

  test("'-0.0000001' becomes '0.0000001'", () => {
    const calc = new Calculator();
    const initialValue = '-0.0000001';
    const finalValue = '0.0000001';
    calc.displayValue = initialValue;
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe(finalValue);
  });
});

describe('Testing fixDecimalDigits()', () => {
  test("Null is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = null;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBeNull();
  });

  test("NaN is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = NaN;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBeNaN();
  });

  test("Undefined is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = undefined;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBeUndefined();
  });

  test("Blank string is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = '';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('');
  });

  test("String is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = 'abc';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('abc');
  });

  test("'.789' becomes '0.789'", () => {
    const calc = new Calculator();
    calc.displayValue = '.789';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('0.789');
  });

  test("'-.789' becomes '-0.789'", () => {
    const calc = new Calculator();
    calc.displayValue = '-.789';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-0.789');
  });

  test("'0.0' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '0.0';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('0');
  });

  test("'.0' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '.0';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('0');
  });

  test("'0.' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '0.';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('0');
  });

  test("'.00000000' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '.00000000';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('0');
  });

  test("'0000000.00000000' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '0000000.00000000';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('0');
  });

  test("'-0000000.00000000' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '-0000000.00000000';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('0');
  });

  test("'0000010.00200000' becomes '10.002'", () => {
    const calc = new Calculator();
    calc.displayValue = '0000010.00200000';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('10.002');
  });

  test("'-0000010.00200000' becomes '-10.002'", () => {
    const calc = new Calculator();
    calc.displayValue = '-0000010.00200000';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-10.002');
  });

  test("'5.' becomes '5'", () => {
    const calc = new Calculator();
    calc.displayValue = '5.';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('5');
  });

  test("'-1.' becomes '-1'", () => {
    const calc = new Calculator();
    calc.displayValue = '-1.';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-1');
  });

  test("'12345.' becomes '12345'", () => {
    const calc = new Calculator();
    calc.displayValue = '12345.';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('12345');
  });

  test("'-12345.' becomes '-12345'", () => {
    const calc = new Calculator();
    calc.displayValue = '-12345';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-12345');
  });

  test("'1234567890' stays the same", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    const testValue = '1234567890';
    calc.displayValue = testValue;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe(testValue);
  });

  test("'12345678901' becomes 'Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '12345678901';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("'-1234567890' stays the same", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    const testValue = '-1234567890';
    calc.displayValue = testValue;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe(testValue);
  });

  test("'-12345678901' becomes 'Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '-12345678901';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("'1234567890.4' becomes '1234567890'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '1234567890.4';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('1234567890');
  });

  test("'-1234567890.4' becomes '-1234567890'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '-1234567890.4';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-1234567890');
  });

  test("'1234567890.5' becomes '1234567891'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '1234567890.5';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('1234567891');
  });

  test("'-1234567890.5' becomes '-1234567891'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '-1234567890.5';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-1234567891');
  });

  test("'12345678901.3' becomes 'Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '12345678901.3';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("'-12345678901.3' becomes 'Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '-12345678901.3';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("'99999.99999' stays the same", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    const testValue = '99999.99999';
    calc.displayValue = testValue;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe(testValue);
  });

  test("'-99999.99999' stays the same", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    const testValue = '-99999.99999';
    calc.displayValue = testValue;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe(testValue);
  });

  test("'99999.999999' becomes '100000'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '99999.999999';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('100000');
  });

  test("'-99999.999999' becomes '-100000'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '-99999.999999';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-100000');
  });

  test("2424.353535 becomes '2424.353535'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = 2424.353535;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('2424.353535');
  });

  test("-2424.353535 becomes '-2424.353535'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = -2424.353535;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-2424.353535');
  });

  test("2424.3535357 becomes '2424.353536'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = 2424.3535357;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('2424.353536');
  });

  test("-2424.3535357 becomes '-2424.353536'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = -2424.3535357;
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-2424.353536');
  });

  test("'3.3333333333333333333' becomes '3.333333333'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '3.3333333333333333333';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('3.333333333');
  });

  test("'-3.3333333333333333333' becomes '-3.333333333'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '-3.3333333333333333333';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-3.333333333');
  });

  test("'6.6666666666666666666' becomes '6.666666667'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '6.6666666666666666666';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('6.666666667');
  });

  test("'-6.6666666666666666666' becomes '-6.666666667'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.displayValue = '-6.6666666666666666666';
    calc.fixDecimalDigits();

    expect(calc.displayValue).toBe('-6.666666667');
  });
});

describe('Testing deleteLastDigit()', () => {
  test("Null is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = null;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBeNull();
  });

  test("NaN is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = NaN;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBeNaN();
  });

  test("Undefined is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = undefined;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBeUndefined();
  });

  test("Blank string is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = '';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('');
  });

  test("String is ignored", () => {
    const calc = new Calculator();
    calc.displayValue = 'abc';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('abc');
  });

  test("'0' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '0';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("0 becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = 0;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("'-0' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '-0';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("'1' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '1';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("5 becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = 5;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("'-2' becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '-2';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("-7 becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = -7;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("'78' becomes '7'", () => {
    const calc = new Calculator();
    calc.displayValue = '78';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('7');
  });

  test("89 becomes '8'", () => {
    const calc = new Calculator();
    calc.displayValue = 89;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('8');
  });

  test("'1.' becomes '1'", () => {
    const calc = new Calculator();
    calc.displayValue = '1.';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('1');
  });

  test("'90.000' becomes '90.00'", () => {
    const calc = new Calculator();
    calc.displayValue = '90.000';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('90.00');
  });

  test("'-33.3333' becomes '-33.333'", () => {
    const calc = new Calculator();
    calc.displayValue = '-33.3333';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('-33.333');
  });

  test("-1234.56789 becomes '-1234.5678'", () => {
    const calc = new Calculator();
    calc.displayValue = -1234.56789;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('-1234.5678');
  });
});