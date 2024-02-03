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

    expect(calc.leftOperand).toBeNull();
    expect(calc.rightOperand).toBeNull();
    expect(calc.operator).toBeNull();
    expect(calc.displayValue).toBe('0');
    expect(calc.resetDisplayValue).toBe(false);
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
    for (let i = 0; i < 10; i++) {
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

  test("'7' to '-7' change does not affect leftOperand when resetDisplayValue = false", () => {
    const calc = new Calculator();
    calc.resetDisplayValue = false;
    calc.leftOperand = 100;
    calc.displayValue = '7';
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe('-7');
    expect(calc.leftOperand).toBe(100);
  });

  test("'-8' to '8' change does not affect leftOperand when resetDisplayValue = false", () => {
    const calc = new Calculator();
    calc.resetDisplayValue = false;
    calc.leftOperand = 100;
    calc.displayValue = '-8';
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe('8');
    expect(calc.leftOperand).toBe(100);
  });

  test("'9' to '-9' change does not affect leftOperand when its null and resetDisplayValue = true", () => {
    const calc = new Calculator();
    calc.resetDisplayValue = true;
    calc.leftOperand = null;
    calc.displayValue = '9';
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe('-9');
    expect(calc.leftOperand).toBeNull();
  });

  test("'-3' to '3' change does not affect leftOperand when its null and resetDisplayValue = true", () => {
    const calc = new Calculator();
    calc.resetDisplayValue = true;
    calc.leftOperand = null;
    calc.displayValue = '-3';
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe('3');
    expect(calc.leftOperand).toBeNull();
  });

  test("'22' to '-22' also sets leftOperand to -22 when its not null and resetDisplayValue = true", () => {
    const calc = new Calculator();
    calc.resetDisplayValue = true;
    calc.leftOperand = 1000;
    calc.displayValue = '22';
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe('-22');
    expect(calc.leftOperand).toBe(-22);
  });

  test("'-55.01' to '55.01' also sets leftOperand to 55.01 when its not null and resetDisplayValue = true", () => {
    const calc = new Calculator();
    calc.resetDisplayValue = true;
    calc.leftOperand = 1000;
    calc.displayValue = '-55.01';
    calc.inputNegativeSign();

    expect(calc.displayValue).toBe('55.01');
    expect(calc.leftOperand).toBe(55.01);
  });

});

describe('Tests inputDigit(digitChar)', () => {
  test('All invalid input are ignored regardless of what resetDisplayValue is set to', () => {
    const calc = new Calculator();
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = '*';
    calc.displayValue = '11.11';

    const invalidInputs = [null, undefined, NaN, '', 44, '55', 56.7, 8.88, {}, 'a', 'abc', Infinity, -Infinity];

    calc.resetDisplayValue = true;
    invalidInputs.forEach(badInput => {
      calc.inputDigit(badInput);
      expect(calc.leftOperand).toBe(2);
      expect(calc.rightOperand).toBe(3);
      expect(calc.operator).toBe('*');
      expect(calc.displayValue).toBe('11.11');
      expect(calc.resetDisplayValue).toBe(true);
    });

    calc.resetDisplayValue = false;
    invalidInputs.forEach(badInput => {
      calc.inputDigit(badInput);
      expect(calc.leftOperand).toBe(2);
      expect(calc.rightOperand).toBe(3);
      expect(calc.operator).toBe('*');
      expect(calc.displayValue).toBe('11.11');
      expect(calc.resetDisplayValue).toBe(false);
    });
  });

  test("Entering '.' while displayValue already has '.', is ignored, while resetDisplayValue is false", () => {
    const calc = new Calculator();
    calc.leftOperand = 34.5;
    calc.rightOperand = -11.11;
    calc.operator = '-';
    calc.resetDisplayValue = false;

    const displayValueList = ['0.', '1.', '-2.', '454.', '-9999.', '3.14', '3.333333', '5.0', '78.00001', '59.000000'];

    displayValueList.forEach(nextDisplayValue => {
      calc.displayValue = nextDisplayValue;
      calc.inputDigit('.');

      expect(calc.leftOperand).toBe(34.5);
      expect(calc.rightOperand).toBe(-11.11);
      expect(calc.operator).toBe('-');
      expect(calc.resetDisplayValue).toBe(false);
      expect(calc.displayValue).toBe(nextDisplayValue);
    });
  });

  test("Entering a valid digit while displayValue is invalid, is ignored, regardless of resetDisplayValue", () => {
    const calc = new Calculator();
    calc.leftOperand = 34.5;
    calc.rightOperand = -11.11;
    calc.operator = '-';
    calc.displayValue = 'Overflow';

    const validDigits = ['.'];

    for (let i = 0; i < 10; i++) {
      validDigits.push(i);
      validDigits.push(i.toString());
    }

    calc.resetDisplayValue = false;
    validDigits.forEach(digit => {
      calc.inputDigit(digit);

      expect(calc.leftOperand).toBe(34.5);
      expect(calc.rightOperand).toBe(-11.11);
      expect(calc.operator).toBe('-');
      expect(calc.resetDisplayValue).toBe(false);
      expect(calc.displayValue).toBe('Overflow');
    });

    calc.resetDisplayValue = true;
    validDigits.forEach(digit => {
      calc.inputDigit(digit);

      expect(calc.leftOperand).toBe(34.5);
      expect(calc.rightOperand).toBe(-11.11);
      expect(calc.operator).toBe('-');
      expect(calc.resetDisplayValue).toBe(true);
      expect(calc.displayValue).toBe('Overflow');
    });

  });

  test('Entering a valid digit while displayValue is a max length integer, is ignored, when resetDisplayValue = false', () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 8.5;
    calc.rightOperand = 100;
    calc.operator = '-';
    calc.displayValue = '1234567890';

    const validDigits = ['.'];

    for (let i = 0; i < 10; i++) {
      validDigits.push(i);
      validDigits.push(i.toString());
    }

    calc.resetDisplayValue = false;
    validDigits.forEach(digit => {
      calc.inputDigit(digit);

      expect(calc.leftOperand).toBe(8.5);
      expect(calc.rightOperand).toBe(100);
      expect(calc.operator).toBe('-');
      expect(calc.resetDisplayValue).toBe(false);
      expect(calc.displayValue).toBe('1234567890');
    });
  });

  test('Entering a valid digit while displayValue is a max length decimal, is ignored, when resetDisplayValue = false', () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 8.5;
    calc.rightOperand = 100;
    calc.operator = '-';
    calc.displayValue = '12345.67890';

    const validDigits = [];

    for (let i = 0; i < 10; i++) {
      validDigits.push(i);
      validDigits.push(i.toString());
    }

    calc.resetDisplayValue = false;
    validDigits.forEach(digit => {
      calc.inputDigit(digit);

      expect(calc.leftOperand).toBe(8.5);
      expect(calc.rightOperand).toBe(100);
      expect(calc.operator).toBe('-');
      expect(calc.resetDisplayValue).toBe(false);
      expect(calc.displayValue).toBe('12345.67890');
    });
  });

  test("Entering '3' while displayValue is is a max length number, is processed, when resetDisplayValue is true", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    calc.displayValue = '123456.7890';

    calc.inputDigit('3');

    // values are shifted: leftOperand = rightOperand, rightOperand = displayValue
    expect(calc.leftOperand).toBe(5);
    expect(calc.rightOperand).toBe(123456.7890);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('3');
  });

  test("Entering '0' while displayValue is '0', is ignored, when resetDisplayValue is false", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = false;
    calc.displayValue = '0';

    calc.inputDigit('0');

    expect(calc.leftOperand).toBe(-1);
    expect(calc.rightOperand).toBe(5);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('0');
  });

  test("Entering '0' while displayValue is '0', is processed, when resetDisplayValue is true", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    calc.displayValue = '0';

    calc.inputDigit('0');

    expect(calc.leftOperand).toBe(5);
    expect(calc.rightOperand).toBe(0);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('0');
  });

  test("Entering '.' while displayValue is '0' and resetDisplayValue is false", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = false;
    calc.displayValue = '0';

    calc.inputDigit('.');

    expect(calc.leftOperand).toBe(-1);
    expect(calc.rightOperand).toBe(5);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('0.');
  });

  test("Entering '.' while displayValue is '0' and resetDisplayValue is true", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    calc.displayValue = '0';

    calc.inputDigit('.');

    expect(calc.leftOperand).toBe(5);
    expect(calc.rightOperand).toBe(0);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('0.');
  });

  test("Entering '8' while displayValue is '1' and resetDisplayValue is false", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = false;
    calc.displayValue = '1';

    calc.inputDigit('8');

    expect(calc.leftOperand).toBe(-1);
    expect(calc.rightOperand).toBe(5);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('18');
  });

  test("Entering '8' while displayValue is '1' and resetDisplayValue is true", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    calc.displayValue = '1';

    calc.inputDigit('8');

    expect(calc.leftOperand).toBe(5);
    expect(calc.rightOperand).toBe(1);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('8');
  });

  test("Entering '3' while displayValue is '-565' and resetDisplayValue is false", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = false;
    calc.displayValue = '-565';

    calc.inputDigit('3');

    expect(calc.leftOperand).toBe(-1);
    expect(calc.rightOperand).toBe(5);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('-5653');
  });

  test("Entering '3' while displayValue is '-565' and resetDisplayValue is true", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    calc.displayValue = '-565';

    calc.inputDigit('3');

    expect(calc.leftOperand).toBe(5);
    expect(calc.rightOperand).toBe(-565);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('3');
  });

  test("Entering '5' while displayValue is '-565.44' and resetDisplayValue is false", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = false;
    calc.displayValue = '-565.44';

    calc.inputDigit('5');

    expect(calc.leftOperand).toBe(-1);
    expect(calc.rightOperand).toBe(5);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('-565.445');
  });

  test("Entering '5' while displayValue is '-565.44' and resetDisplayValue is true", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    calc.displayValue = '-565.44';

    calc.inputDigit('5');

    expect(calc.leftOperand).toBe(5);
    expect(calc.rightOperand).toBe(-565.44);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('5');
  });

  test("Entering '.' while displayValue is '333' and resetDisplayValue is false", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = false;
    calc.displayValue = '333';

    calc.inputDigit('.');

    expect(calc.leftOperand).toBe(-1);
    expect(calc.rightOperand).toBe(5);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('333.');
  });

  test("Entering '.' while displayValue is '333' and resetDisplayValue is true", () => {
    const calc = new Calculator();
    calc.leftOperand = -1;
    calc.rightOperand = 5;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    calc.displayValue = '333';

    calc.inputDigit('.');

    expect(calc.leftOperand).toBe(5);
    expect(calc.rightOperand).toBe(333);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(false);
    expect(calc.displayValue).toBe('0.');
  });
});

describe('Tests inputOperator(operatorChar)', () => {
  test('All invalid input are ignored', () => {
    const calc = new Calculator();
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = '*';
    calc.displayValue = '11.11';
    calc.resetDisplayValue = true;

    const invalidInputs = [null, undefined, NaN, Infinity, -Infinity, 0, '3', '.', 'a', 'c', '!'];

    invalidInputs.forEach(badInput => {
      calc.inputOperator(badInput);
      expect(calc.leftOperand).toBe(2);
      expect(calc.rightOperand).toBe(3);
      expect(calc.operator).toBe('*');
      expect(calc.displayValue).toBe('11.11');
    });

    expect(mockInputEquals).toHaveBeenCalledTimes(0);
  });

  test('All valid operators are ignored when displayValue is not valid', () => {
    const calc = new Calculator();
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = 'a'; // this is not a valid operator, just using this to make sure that it does not change
    calc.displayValue = 'Invalid';
    calc.resetDisplayValue = true;

    const validOperators = ['+', '-', '*', '/'];

    validOperators.forEach(operatorInput => {
      calc.inputOperator(operatorInput);

      expect(calc.leftOperand).toBe(2);
      expect(calc.rightOperand).toBe(3);
      expect(calc.operator).toBe('a');
      expect(calc.displayValue).toBe('Invalid');
    });

    expect(mockInputEquals).toHaveBeenCalledTimes(0);
  });

  test('All valid operators set when resetDisplayValue is true (inputEquals does not get called)', () => {
    const calc = new Calculator();
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = 'a'; // this is not a valid operator, just using this to make sure that it does change
    calc.displayValue = '100';
    calc.resetDisplayValue = true;

    const validOperators = ['+', '-', '*', '/'];

    validOperators.forEach(operatorInput => {
      calc.inputOperator(operatorInput);

      expect(calc.leftOperand).toBe(2);
      expect(calc.rightOperand).toBe(3);
      expect(calc.operator).toBe(operatorInput);
      expect(calc.displayValue).toBe('100');
    });

    expect(mockInputEquals).toHaveBeenCalledTimes(0);
  });

  test('All valid operators set when resetDisplayValue is false (inputEquals does get called)', () => {
    const calc = new Calculator();
    const mockInputEquals = jest.spyOn(calc, 'inputEquals').mockImplementation(jest.fn());
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = 'a'; // this is not a valid operator, just using this to make sure that it does change
    calc.displayValue = '100';

    const validOperators = ['+', '-', '*', '/'];

    validOperators.forEach(operatorInput => {
      calc.resetDisplayValue = false;
      calc.inputOperator(operatorInput);

      expect(calc.leftOperand).toBe(2);
      expect(calc.rightOperand).toBe(3);
      expect(calc.operator).toBe(operatorInput);
      expect(calc.displayValue).toBe('100');
    });

    expect(mockInputEquals).toHaveBeenCalledTimes(validOperators.length);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

describe('Tests inputEquals()', () => {
  test('Does not do anything when displayValue is not valid', () => {
    const calc = new Calculator();
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = '-';
    calc.resetDisplayValue = true;
    calc.displayValue = 'Invalid';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(2);
    expect(calc.rightOperand).toBe(3);
    expect(calc.operator).toBe('-');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('Invalid');
  });

  test('Does not do anything when operator is null', () => {
    const calc = new Calculator();
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = null;
    calc.resetDisplayValue = true;
    calc.displayValue = '100';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(2);
    expect(calc.rightOperand).toBe(3);
    expect(calc.operator).toBeNull();
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('100');
  });

  test('Does not do anything when rightOperand is null', () => {
    const calc = new Calculator();
    calc.leftOperand = 2;
    calc.rightOperand = null;
    calc.operator = '*';
    calc.resetDisplayValue = true;
    calc.displayValue = '100';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(2);
    expect(calc.rightOperand).toBeNull();
    expect(calc.operator).toBe('*');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('100');
  });

  test('Does not do anything when leftOperand is null and resetDisplayValue is true', () => {
    const calc = new Calculator();
    calc.leftOperand = null;
    calc.rightOperand = 5;
    calc.operator = '*';
    calc.resetDisplayValue = true;
    calc.displayValue = '100';

    calc.inputEquals();

    expect(calc.leftOperand).toBeNull();
    expect(calc.rightOperand).toBe(5);
    expect(calc.operator).toBe('*');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('100');
  });

  test('Makes calculation when leftOperand is null and resetDisplayValue is false', () => {
    const calc = new Calculator();
    calc.leftOperand = null;
    calc.rightOperand = 5;
    calc.operator = '+';
    calc.resetDisplayValue = false;
    calc.displayValue = '100';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(105);
    expect(calc.rightOperand).toBe(100);
    expect(calc.operator).toBe('+');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('105');
  });

  test("leftOp=3, rightOp=5, operator='+', displayValue='4', resetDisplayValue=false: Updated displayValue='9'", () => {
    const calc = new Calculator();
    calc.leftOperand = 3;
    calc.rightOperand = 5;
    calc.operator = '+';
    calc.resetDisplayValue = false;
    calc.displayValue = '4';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(9);
    expect(calc.rightOperand).toBe(4);
    expect(calc.operator).toBe('+');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('9');
  });

  test("leftOp=3.1, rightOp=5, operator='+', displayValue='4', resetDisplayValue=true: Updated displayValue='8.1'", () => {
    const calc = new Calculator();
    calc.leftOperand = 3.1;
    calc.rightOperand = 5;
    calc.operator = '+';
    calc.resetDisplayValue = true;
    // Normally displayValue is the string version of leftOperand,
    // when resetDisplayValue is true.  This is for testing purposes.
    calc.displayValue = '4';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(8.1);
    expect(calc.rightOperand).toBe(5);
    expect(calc.operator).toBe('+');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('8.1');
  });

  test("leftOp=-3, rightOp=5, operator='+', displayValue='-4.01', resetDisplayValue=false: Updated displayValue='0.99'", () => {
    const calc = new Calculator();
    calc.leftOperand = 3;
    calc.rightOperand = 5;
    calc.operator = '+';
    calc.resetDisplayValue = false;
    calc.displayValue = '-4.01';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(0.99);
    expect(calc.rightOperand).toBe(-4.01);
    expect(calc.operator).toBe('+');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('0.99');
  });

  test("leftOp=-3, rightOp=5, operator='+', displayValue='-4.01', resetDisplayValue=true: Updated displayValue='2'", () => {
    const calc = new Calculator();
    calc.leftOperand = -3;
    calc.rightOperand = 5;
    calc.operator = '+';
    calc.resetDisplayValue = true;
    calc.displayValue = '-4.01';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(2);
    expect(calc.rightOperand).toBe(5);
    expect(calc.operator).toBe('+');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('2');
  });

  test("leftOp=25.25, rightOp=4.25, operator='-', displayValue='5.05', resetDisplayValue=false: Updated displayValue='-0.8'", () => {
    const calc = new Calculator();
    calc.leftOperand = 25.25;
    calc.rightOperand = 4.25;
    calc.operator = '-';
    calc.resetDisplayValue = false;
    calc.displayValue = '5.05';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(-0.8);
    expect(calc.rightOperand).toBe(5.05);
    expect(calc.operator).toBe('-');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('-0.8');
  });

  test("leftOp=25.25, rightOp=4.25, operator='-', displayValue='5.05', resetDisplayValue=true: Updated displayValue='21'", () => {
    const calc = new Calculator();
    calc.leftOperand = 25.25;
    calc.rightOperand = 4.25;
    calc.operator = '-';
    calc.resetDisplayValue = true;
    calc.displayValue = '5.05';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(21);
    expect(calc.rightOperand).toBe(4.25);
    expect(calc.operator).toBe('-');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('21');
  });

  test("leftOp=4, rightOp=-3.5, operator='-', displayValue='-2', resetDisplayValue=false: Updated displayValue='-1.5'", () => {
    const calc = new Calculator();
    calc.leftOperand = 4;
    calc.rightOperand = -3.5;
    calc.operator = '-';
    calc.resetDisplayValue = false;
    calc.displayValue = '-2';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(-1.5);
    expect(calc.rightOperand).toBe(-2);
    expect(calc.operator).toBe('-');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('-1.5');
  });

  test("leftOp=4, rightOp=-3.5, operator='-', displayValue='-2', resetDisplayValue=true: Updated displayValue='7.5'", () => {
    const calc = new Calculator();
    calc.leftOperand = 4;
    calc.rightOperand = -3.5;
    calc.operator = '-';
    calc.resetDisplayValue = true;
    // Normally this would be the same as leftOperand when resetDisplayValue=true
    calc.displayValue = '-2';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(7.5);
    expect(calc.rightOperand).toBe(-3.5);
    expect(calc.operator).toBe('-');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('7.5');
  });

  test("leftOp=4.5, rightOp=-3.5, operator='*', displayValue='1.1', resetDisplayValue=false: Updated displayValue='-3.85'", () => {
    const calc = new Calculator();
    calc.leftOperand = 4.5;
    calc.rightOperand = -3.5;
    calc.operator = '*';
    calc.resetDisplayValue = false;
    calc.displayValue = '1.1';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(-3.85);
    expect(calc.rightOperand).toBe(1.1);
    expect(calc.operator).toBe('*');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('-3.85');
  });

  test("leftOp=4.5, rightOp=-3.5, operator='*', displayValue='1.1', resetDisplayValue=true: Updated displayValue='-15.75'", () => {
    const calc = new Calculator();
    calc.leftOperand = 4.5;
    calc.rightOperand = -3.5;
    calc.operator = '*';
    calc.resetDisplayValue = true;
    // Normally this would be the same as leftOperand when resetDisplayValue=true
    calc.displayValue = '1.1';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(-15.75);
    expect(calc.rightOperand).toBe(-3.5);
    expect(calc.operator).toBe('*');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('-15.75');
  });

  test("leftOp=2, rightOp=3, operator='/', displayValue='7', resetDisplayValue=false: Updated displayValue='0.428571429'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = '/';
    calc.resetDisplayValue = false;
    calc.displayValue = '7';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(0.428571429);
    expect(calc.rightOperand).toBe(7);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('0.428571429');
  });

  test("leftOp=2, rightOp=3, operator='/', displayValue='7', resetDisplayValue=true: Updated displayValue='0.666666667'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    // Normally this would be the same as leftOperand when resetDisplayValue=true
    calc.displayValue = '7';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(0.666666667);
    expect(calc.rightOperand).toBe(3);
    expect(calc.operator).toBe('/');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('0.666666667');
  });

  test("leftOp=2, rightOp=3, operator='/', displayValue='0.', resetDisplayValue=false: Updated displayValue='Div by 0!'", () => {
    const calc = new Calculator();
    calc.leftOperand = 2;
    calc.rightOperand = 3;
    calc.operator = '/';
    calc.resetDisplayValue = false;
    calc.displayValue = '0';

    calc.inputEquals();

    expect(calc.displayValue).toBe('Div by 0!');
  });

  test("leftOp=-2, rightOp=0, operator='/', displayValue='6.7', resetDisplayValue=true: Updated displayValue='Div by 0!'", () => {
    const calc = new Calculator();
    calc.leftOperand = -2;
    calc.rightOperand = 0;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    calc.displayValue = '6.7';

    calc.inputEquals();

    expect(calc.displayValue).toBe('Div by 0!');
  });

  test("leftOp=2, rightOp=1, operator='+', displayValue='9999999999', resetDisplayValue=false: Updated displayValue='Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 2;
    calc.rightOperand = 1;
    calc.operator = '+';
    calc.resetDisplayValue = false;
    calc.displayValue = '9999999999';

    calc.inputEquals();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("leftOp=2, rightOp=9999999999, operator='+', displayValue='1', resetDisplayValue=true: Updated displayValue='Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 2;
    calc.rightOperand = 9999999999;
    calc.operator = '+';
    calc.resetDisplayValue = true;
    calc.displayValue = '1';

    calc.inputEquals();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("leftOp=2, rightOp=-1, operator='-', displayValue='-9999999999', resetDisplayValue=false: Updated displayValue='Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 2;
    calc.rightOperand = 11;
    calc.operator = '-';
    calc.resetDisplayValue = false;
    calc.displayValue = '-9999999999';

    calc.inputEquals();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("leftOp=-2, rightOp=9999999999, operator='-', displayValue='1', resetDisplayValue=true: Updated displayValue='Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = -2;
    calc.rightOperand = 9999999999;
    calc.operator = '-';
    calc.resetDisplayValue = true;
    calc.displayValue = '1';

    calc.inputEquals();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("leftOp=-2, rightOp=9999999999, operator='*', displayValue='9999999999', resetDisplayValue=false: Updated displayValue='Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 2;
    calc.rightOperand = 9999999999;
    calc.operator = '*';
    calc.resetDisplayValue = false;
    calc.displayValue = '9999999999';

    calc.inputEquals();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("leftOp=999999.9999, rightOp=9999999.999, operator='*', displayValue='-0.1', resetDisplayValue=true: Updated displayValue='Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 999999.9999;
    calc.rightOperand = 9999999.999;
    calc.operator = '*';
    calc.resetDisplayValue = true;
    calc.displayValue = '-0.1';

    calc.inputEquals();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("leftOp=1000000000, rightOp=0.1, operator='/', displayValue='5', resetDisplayValue=true: Updated displayValue='Overflow'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 1000000000;
    calc.rightOperand = 0.1;
    calc.operator = '/';
    calc.resetDisplayValue = true;
    calc.displayValue = '5';

    calc.inputEquals();

    expect(calc.displayValue).toBe('Overflow');
  });

  test("leftOp=1000000000, rightOp=0.000000001, operator='+', displayValue='1', resetDisplayValue=true: Updated displayValue='1000000000'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 1000000000;
    calc.rightOperand = 0.000000001;
    calc.operator = '+';
    calc.resetDisplayValue = true;
    calc.displayValue = '1000000000';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(1000000000);
    expect(calc.rightOperand).toBe(0.000000001);
    expect(calc.operator).toBe('+');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('1000000000');
  });

  test("leftOp=0.000000001, rightOp=0.000000001, operator='*', displayValue='1', resetDisplayValue=true: Updated displayValue='0'", () => {
    const calc = new Calculator();
    Calculator.MAX_DIGITS = 10;
    calc.leftOperand = 0.000000001;
    calc.rightOperand = 0.000000001;
    calc.operator = '*';
    calc.resetDisplayValue = true;
    calc.displayValue = '1';

    calc.inputEquals();

    expect(calc.leftOperand).toBe(0);
    expect(calc.rightOperand).toBe(0.000000001);
    expect(calc.operator).toBe('*');
    expect(calc.resetDisplayValue).toBe(true);
    expect(calc.displayValue).toBe('0');
  });
});

describe('Tests fixDecimalDigits()', () => {
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

describe('Tests deleteLastDigit()', () => {
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