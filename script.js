import {click, keyDown, keyUp, checkDigit, Clear, ClearOneDigit} from './functions.js';

let first = '0'; //first Number
let second = '0'; //second Number
let sign = ''; // sign
let result = false; //The variable indicates that the math operation has completed. 
let percent = 0; // the variable stores the value %
let digitAfterComma = 0; // the varibale stores the count of digit after comma in 
// float number. Its use for function toFixed()
//Clear all values 

let keyValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','];
let keyCodes = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4',
  'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
  'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4',
  'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadDecimal'];
let signsValues = ['+', '-', '*', '/'];
let signsCodes = ['NumpadAdd', 'NumpadSubtract', 'NumpadDivide', 'NumpadMultiply'];

let input = document.querySelector('.display input');
let tempBTN = document.querySelectorAll('button');



document.addEventListener('click', (event)=> {
    let resObj = null;
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
        resObj = Clear(first, second, sign, percent, result, input);
        first = resObj.first;
        second = resObj.second;
        sign = resObj.sign;
        percent = resObj.percent;
        result = resObj.result;     
        break;
      case '<=':
        resObj = ClearOneDigit(first, second, sign, result, input);
        first = resObj.first;
        second = resObj.second;
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
});
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);