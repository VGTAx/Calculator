
let first = '0'; //first Number
let second = '0'; //second Number
let sign = ''; // sign
let result = false; //The variable indicates that the math operation has completed. 
let percent = 0; // the variable stores the value %
let digitAfterComma = 0; // the varibale stores the count of digit after comma in 
// float number. Its use for function toFixed()
let tempBTN = document.querySelectorAll('button');

let keyValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',']; 
let keyCodes = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4',
  'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
  'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4',
  'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadDecimal'];
let signsValues = ['+', '-', '*', '/']; 
let signsCodes = ['NumpadAdd', 'NumpadSubtract', 'NumpadDivide', 'NumpadMultiply'];
let input = document.querySelector('.display input');

//Clear all values 
function Clear() {
  first = '0';
  second = '0';
  sign = '';
  percent = '0';
  result = false;
  input.value = '0';
}
//Clear current enter value
function ClearEntry() {
  if (first !== '0' && sign === '') {
    input.value = 0;
    return first = '0';
  }
  input.value = 0;
  return second = '0';
}
//Clear one digit of number
function ClearOneDigit() {
  if (first !== '0' && second !== '0' && result) return;
  if (first !== '0' && sign === '') {
    first = first.slice(0, -1);
    first = first.length == 0 ? '0' : first;
    input.value = first;
    return first;
  }
  second = second.slice(0, -1);
  second = second.length == 0 ? '0' : second;
  input.value = second;
}
//count number digit after comma for method toFixed();
function NumberDigitAfterComma(first, second, sign) {

  //variables store the number of decimal places
  let numberDigitFirst = 0;
  let numberDigitSecond = 0;

  first = first.toString();
  second = second.toString();

  if (first.includes('.')) {
    numberDigitFirst = first.split('.')[1].length;
  }
  if (second.includes('.')) {
    numberDigitSecond = second.split('.')[1].length;
  }
  //fractional value
  let fractionFirstNumber = first.split('.')[1];
  let fractionSecondNumber = second.split('.')[1];

  // check whether fractional parts are given when adding / subtracting an integer or not, if yes
  //then return the number of decimal places
  switch (sign) {
    case "+":
      if (+fractionFirstNumber + +fractionSecondNumber === 100) 
        return 0
    case "-":
      if (+fractionFirstNumber - +fractionSecondNumber === 0) 
        return 0
  }

  return numberDigitFirst >= numberDigitSecond ? numberDigitFirst : numberDigitSecond;
}
//Checks for a dot in a number 
function checkDigit(number, key) {
  if (number === '0') {
    if (key === '.' || key === ',') {
      return number += '.';
    }
    return number = key;
  }
  if (number !== '0') {
    if ((number.includes('.') || number.includes(',')) &&
      (key === '.' || key === ',')) {
      return number
    }
    return number = key == (',') ? number += '.' : number += key;
  }
}
//calc result
function calcResult() {
  switch (sign) {
    case '+':
      digitAfterComma = NumberDigitAfterComma(first, second, sign);
      first = (+first) + (+second);
      break;
    case '-':
      digitAfterComma = NumberDigitAfterComma(first, second, sign);
      first = (+first) - (+second);
      break;
    case '*':
      first = (+first) * (+second);
      digitAfterComma = first.toString().split('.')[1]?.length;
      break;
    case '/':
      if (second === '0') {
        input.value = 'Деление на 0 невозможно';
        break;
      }
      first = (+first) / (+second);
      // if (first === 0) {
      //   first = 'Переполнение';
      //   return input.value = first;
      // }
      digitAfterComma = first.toString().split('.')[1]?.length;
      break;
  }
  first = first.toFixed(digitAfterComma);
  input.value = +first;
  result = true;
}
//reverses the sign of a number
function signReversal() {
  if (second === '0' && sign === '') {
    first = -first;
    input.value = first;
  }
  else if (first !== '0' && second !== '0' && sign !== '' && !result) {
    second = -second;
    input.value = second;
  }
  else if (first !== '0' && second !== '0' && sign !== '') {
    first = -first;
    input.value = first;
  }
  else if (first !== '0' && sign !== '' && result) {
    second = '0';
    result = false;
  }
  else {
    second = -second;
    input.value = second;
  }
}
//divide one to number
function oneToShare() {
  if (second === '0' && sign === '') {
    first = 1 / first;
    input.value = first;
  }
  else if (first !== '0' && second !== '0' && sign !== '' && !result) {
    second = 1 / second;
    input.value = second;
  }
  else if (first !== '0' && second !== '0' && sign !== '') {
    first = 1 / first;
    input.value = first;
  }
  // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the second will be equal to the entered value
  else if (first !== '0' && sign !== '' && result) {
    second = '0';
    result = false;
  }
  else {
    second = 1 / second;
    input.value = second;
  }
}
//calc percent
function calcPercent() {
  percent = second;
  second = +first * +percent / 100;
  return input.value = second;
}
//calculates the square of a number
function square() {
  if (second === '0' && sign === '') {
    first = Math.pow(first, 2);
    input.value = first;
  }
  else if (first !== '0' && second !== '0' && sign !== '' && !result) {
    second = Math.pow(second, 2);
    input.value = second;
  }
  else if (first !== '0' && second !== '0' && sign !== '') {
    first = Math.pow(first, 2);
    input.value = first;
  }
  // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the second will be equal to the entered value
  else if (first !== '0' && sign !== '' && result) {
    second = Math.pow(first, 2);
    result = false;
  }
  else {
    second = Math.pow(second, 2);
    input.value = second;
  }
}
//calculates the square root of a number
function squareRoot() {
  if (second === '0' && sign === '') {
    first = Math.sqrt(first);
    input.value = first;
  }
  else if (first !== '0' && second !== '0' && sign !== '' && !result) {
    second = Math.sqrt(second);
    input.value = second;
  }
  else if (first !== '0' && second !== '0' && sign !== '') {
    first = Math.sqrt(first);
    input.value = first;
  }
  else if (first !== '0' && sign !== '' && result) {
    first = Math.sqrt(first);
    result = false;
  }
  else {
    second = Math.sqrt(second);
    input.value = second;
  }
}
document.addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn')) return
  let key = event.target.textContent;
  if (keyValues.includes(key)) {
    if (second === '0' && sign === '') {
      first = checkDigit(first, key);
      input.value = first;
    }
    // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the second will be equal to the entered value
    else if (first !== '' && sign !== '' && result) {
      second = '0';
      second = checkDigit(second, key);
      input.value = second;
      result = false;
    }
    else {
      second = checkDigit(second, key);
      input.value = second;
    }
  }
  if (signsValues.includes(key)) {
    sign = key;
    input.value = sign;
  }


  switch (key) {
    case 'CE':
      return !result ? ClearEntry() : null;
    case 'C':
      Clear();
      break;
    case '<=':
      ClearOneDigit();
      break;
    case '=':
      calcResult();
      break;
    case '+/-':
      signReversal();
      break;
    case '%':
      calcPercent();
      break;
    case '1/x':
      oneToShare();
      break;
    case 'x2':
      square();
      break;
    case '√X':
      squareRoot();
      break;
  }
})
document.addEventListener('keyup', (event) => {
  for (const iterator of tempBTN) {
    if (event.key == iterator.getAttribute('key') && event.shiftKey) {
      iterator.classList.toggle('btnDown');
      break;
    }

    if (event.code == (iterator.getAttribute('keyNum') || iterator.getAttribute('key'))) {
      iterator.classList.toggle('btnDown');
      break;
    }
  }
})
document.addEventListener('keydown', (event) => {
  for (const iterator of tempBTN) {
    if (event.key == iterator.getAttribute('key') && event.shiftKey) {
      iterator.classList.toggle('btnDown');
      break;
    }
    if (event.code == (iterator.getAttribute('keyNum') || iterator.getAttribute('key'))) {
      iterator.classList.toggle('btnDown');
      break;
    }
  }
  let key = event.code == 'Digit5' && event.shiftKey ?
    '%' : event.code && event.shiftKey ?
      null : event.code;
  if (keyCodes.includes(key)) {
    if (second === '0' && sign === '') {
      first = checkDigit(first, event.key);
      input.value = input.value.length > 16 ? input.value : first
    }
    // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the second will be equal to the entered value
    else if (first !== '' && sign !== '' && result) {
      second = '0';
      second = checkDigit(second, event.key);
      input.value = input.value.length > 16 ? input.value : second;
      result = false;
    }
    else {
      second = checkDigit(second, event.key);
      input.value = input.value.length > 16 ? input.value : second;
    }
  }
  if (signsCodes.includes(key)) {
    sign = event.key;
    input.value = sign;
  }

  switch (key) {
    case 'Delete':
      return !result ? ClearEntry() : null;
    case 'Escape':
      Clear();
      break;
    case 'Backspace':
      ClearOneDigit();
      break;
    case 'NumpadEnter':
      calcResult();
      break;
    case 'Enter':
      calcResult();
      break;
    case 'F9':
      signReversal();
      break;
    case '%':
      calcPercent();
      break;
    case 'KeyR':
      oneToShare();
      break;
    case 'KeyQ':
      square();
      break;
    case '√X':
      squareRoot();
      break;
  }
})