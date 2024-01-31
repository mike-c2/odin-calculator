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