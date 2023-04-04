import {Clear, ClearEntry, ClearOneDigit, checkDigit, calcResult, signReversal,
  oneToShare, calcPercent, square, squareRoot}
from './functions.js';

// import {first, second, sign, result, tempBTN, keyValues,
//   keyCodes, signsValues, signsCodes, input}
// from './variables.js';

let first = '0'; //first Number
let second = '0'; //second Number
let sign = ''; // sign
let result = false; //The variable indicates that the math operation has completed. 
let percent = 0; // the variable stores the value %
let tempBTN = document.querySelectorAll('button');
let keyValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','];
let keyCodes = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4',
  'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
  'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4',
  'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadDecimal'];
let signsValues = ['+', '-', '*', '/'];
let signsCodes = ['NumpadAdd', 'NumpadSubtract', 'NumpadDivide', 'NumpadMultiply'];
let input = document.querySelector('.display input');


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


export {
  first, second, sign, result, percent, tempBTN, keyValues,
  keyCodes, signsValues, signsCodes, input
};