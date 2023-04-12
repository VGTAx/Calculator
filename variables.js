'use strict'

export { input, keyCodes, keyValues, signsValues, signsCodes, pressedBtn};

let keyValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','];
let keyCodes = ['Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4',
  'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
  'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4',
  'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'NumpadDecimal'];
let signsValues = ['+', '-', '*', '/'];
let signsCodes = ['NumpadAdd', 'NumpadSubtract', 'NumpadDivide', 'NumpadMultiply'];

let input = document.querySelector('.display input'); //displays entered value
input.value = '0';

let pressedBtn = document.querySelectorAll('button'); 