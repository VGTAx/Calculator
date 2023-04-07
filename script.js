import {click, keyDown, keyUp} from './functions.js';
export {input, keyCodes, keyValues, signsValues, signsCodes, tempBTN};

let keyValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','];
let keyCodes = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4',
  'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
  'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4',
  'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadDecimal'];
let signsValues = ['+', '-', '*', '/'];
let signsCodes = ['NumpadAdd', 'NumpadSubtract', 'NumpadDivide', 'NumpadMultiply'];

let input = document.querySelector('.display input');
input.value = '0';
let tempBTN = document.querySelectorAll('button');

let calculation = {
  first: '0', //first Number
  second: '0', //second Number
  result: false, //The variable indicates that the math operation has completed. 
  sign: '', // sign
  percent: 0,
  digitAfterComma: 0,// the varibale stores the count of digit after comma in  // float number. 
  //Its use for function toFixed() 
};



document.addEventListener('click', (event) => {
  click(event, calculation);
});
document.addEventListener('keydown', (event) => {
  keyDown(event, calculation);
});
document.addEventListener('keyup', keyUp);