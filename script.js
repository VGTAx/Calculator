import {click, keyDown, keyUp, checkDigit, Clear, ClearOneDigit} from './functions.js';
export {input};
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

let resObj = {
  first: '0',
  second: '0',
  result: false,
  sign: '',
  percent: 0,
};


document.addEventListener('click', (event)=> {
    
    if (!event.target.classList.contains('btn')) return
    let key = event.target.textContent;
    if (keyValues.includes(key)) {
      if (resObj.second === '0' && resObj.sign === '') {
        resObj.first = checkDigit(resObj.first, key);
        input.value = resObj.first;
      }
      // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the resObj.second will be equal to the entered value
      else if (resObj.first !== '' && resObj.sign !== '' && resObj.result) {
        resObj.second = '0';
        resObj.second = checkDigit(resObj.second, key);
        input.value = resObj.second;
        resObj.result = false;
      }
      else {
        resObj.second = checkDigit(resObj.second, key);
        input.value = resObj.second;
      }
    }
    if (signsValues.includes(key)) {
      resObj.sign = key;
      input.value = resObj.sign;
    }
    


    switch (key) {
      case 'CE':
        return !resObj.result ? ClearEntry() : null;
      case 'C':
        resObj = Clear(resObj);            
        break;
      case '<=':
        resObj = ClearOneDigit(resObj);        
        break;
      case '=':
        resObj = calcResult(resObj);
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