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

describe('Testing deleteLastDigit()', () => {
  test("Null becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = null;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("NaN becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = NaN;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("Undefined becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = undefined;
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
  });

  test("Blank string becomes '0'", () => {
    const calc = new Calculator();
    calc.displayValue = '';
    calc.deleteLastDigit();

    expect(calc.displayValue).toBe('0');
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