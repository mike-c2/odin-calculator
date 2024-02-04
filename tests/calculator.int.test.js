const Calculator = require('../scripts/calculator');

test("Input: '1+2='; Output: '3'", () => {
  const calc = new Calculator();
  calc.massInput('1+2=');
  expect(calc.displayValue).toBe('3');
});

test("Input: '1+2=='; Output: '5'", () => {
  const calc = new Calculator();
  calc.massInput('1+2==');
  expect(calc.displayValue).toBe('5');
});

test("Input: '1+2==='; Output: '7'", () => {
  const calc = new Calculator();
  calc.massInput('1+2===');
  expect(calc.displayValue).toBe('7');
});

test("Input: '1+2*'; Output: '3'", () => {
  const calc = new Calculator();
  calc.massInput('1+2*');
  expect(calc.displayValue).toBe('3');
});

test("Input: '1+2*3.14!4'; Output: '-3.144' (note the ! between the 4's, makes negative)", () => {
  const calc = new Calculator();
  calc.massInput('1+2*3.14!4');
  expect(calc.displayValue).toBe('-3.144');
});

test("Input: '1+2*3.14!4='; Output: '-9.432'", () => {
  const calc = new Calculator();
  calc.massInput('1+2*3.14!4=');
  expect(calc.displayValue).toBe('-9.432');
});

test("Input: '12345ddd.01+999999c.02='; Output: '12.03'", () => {
  const calc = new Calculator();
  calc.massInput('12345ddd.01+999999c.02=');
  expect(calc.displayValue).toBe('12.03');
});

test("Input: '12345678909999999999999999999999999999999'; Output: '1234567890'", () => {
  const calc = new Calculator();
  calc.massInput('12345678909999999999999999999999999999999');
  expect(calc.displayValue).toBe('1234567890');
});

test("Input: '.'; Output: '0.'", () => {
  const calc = new Calculator();
  calc.massInput('.');
  expect(calc.displayValue).toBe('0.');
});

test("Input: '1.1.1.1.1.'; Output: '1.1111'", () => {
  const calc = new Calculator();
  calc.massInput('1.1.1.1.1.');
  expect(calc.displayValue).toBe('1.1111');
});

test("Input: '1/3*'; Output: '0.333333333'", () => {
  const calc = new Calculator();
  calc.massInput('1/3*');
  expect(calc.displayValue).toBe('0.333333333');
});

test("Input: '1/3*2-'; Output: '0.666666666'", () => {
  const calc = new Calculator();
  calc.massInput('1/3*2-');
  expect(calc.displayValue).toBe('0.666666666');
});

test("Input: '1/3*2-a2/3='; Output: '0.666666667'", () => {
  const calc = new Calculator();
  calc.massInput('1/3*2-a2/3=');
  expect(calc.displayValue).toBe('0.666666667');
});

test("Input: '1000000000*1000000000='; Output: 'Overflow'", () => {
  const calc = new Calculator();
  calc.massInput('1000000000*1000000000=');
  expect(calc.displayValue).toBe('Overflow');
});

test("Input: '/0='; Output: 'Div by 0!'", () => {
  const calc = new Calculator();
  calc.massInput('/0=');
  expect(calc.displayValue).toBe('Div by 0!');
});

test("Input: '/0=!'; Output: 'Div by 0!'", () => {
  const calc = new Calculator();
  calc.massInput('/0=!');
  expect(calc.displayValue).toBe('Div by 0!');
});

test("Input: '/0=!c1+1='; Output: 'Div by 0!'", () => {
  const calc = new Calculator();
  calc.massInput('/0=!c1+1=');
  expect(calc.displayValue).toBe('Div by 0!');
});

test("Input: '/0=a1/1='; Output: 'Div by 0!'", () => {
  const calc = new Calculator();
  calc.massInput('/0=a1/1=');
  expect(calc.displayValue).toBe('1');
});

test("Input: '1+2+-/*='; Output: '6'", () => {
  const calc = new Calculator();
  calc.massInput('1+2+-/*=');
  expect(calc.displayValue).toBe('6');
});

test("Input: '1+2+-/*=='; Output: '12'", () => {
  const calc = new Calculator();
  calc.massInput('1+2+-/*==');
  expect(calc.displayValue).toBe('12');
});

test("Input: '1+2+-/*==/='; Output: '6'", () => {
  const calc = new Calculator();
  calc.massInput('1+2+-/*==/=');
  expect(calc.displayValue).toBe('6');
});

test("Input: '.1+.2*10+2-1='; Output: '4'", () => {
  const calc = new Calculator();
  calc.massInput('.1+.2*10+2-1=');
  expect(calc.displayValue).toBe('4');
});

test("Input: '.1+.2*10+2-1='; Output: '-4'", () => {
  const calc = new Calculator();
  calc.massInput('.1+.2*10+2-1=!');
  expect(calc.displayValue).toBe('-4');
});

test("Input: '3d'; Output: '0'", () => {
  const calc = new Calculator();
  calc.massInput('3d');
  expect(calc.displayValue).toBe('0');
});

test("Input: '111+222='; Output: '333'", () => {
  const calc = new Calculator();
  calc.massInput('111+222=');
  expect(calc.displayValue).toBe('333');
});

test("Input: '111+222=d'; Output: '0'", () => {
  const calc = new Calculator();
  calc.massInput('111+222=d');
  expect(calc.displayValue).toBe('0');
});

test("Input: '111+222=.'; Output: '0.'", () => {
  const calc = new Calculator();
  calc.massInput('111+222=.');
  expect(calc.displayValue).toBe('0.');
});

test("Input: '111+222=!'; Output: '-333'", () => {
  const calc = new Calculator();
  calc.massInput('111+222=!');
  expect(calc.displayValue).toBe('-333');
});

test("Input: '111+222=!d'; Output: '0'", () => {
  const calc = new Calculator();
  calc.massInput('111+222=!d');
  expect(calc.displayValue).toBe('0');
});

test("Input: '00000'; Output: '0'", () => {
  const calc = new Calculator();
  calc.massInput('00000');
  expect(calc.displayValue).toBe('0');
});

test("Input: '.00000'; Output: '0.00000'", () => {
  const calc = new Calculator();
  calc.massInput('.00000');
  expect(calc.displayValue).toBe('0.00000');
});