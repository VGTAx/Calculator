'use strict';

import { input, keyCodes, keyValues, signsCodes, signsValues, tempBTN } from './script.js';
export { click, keyDown, keyUp, mouseover, mouseout };
//Clear All
function Clear(calculation) {
  calculation.first = '0';
  calculation.second = '0';
  calculation.sign = '';
  calculation.percent = '0';
  calculation.result = false;
  input.value = '0';
}
//Clear current enter value
function ClearEntry(calculation) {
  if (calculation.first !== '0' && calculation.sign === '') {
    input.value = 0;
    return calculation.first = '0';
  }
  input.value = 0;
  return calculation.second = '0';
}
//Clear one digit of number
function ClearOneDigit(calculation) {
  if (calculation.first !== '0' && calculation.second !== '0' && calculation.result) return;
  if (calculation.first !== '0' && calculation.sign === '') {
    
    calculation.first = calculation.first.slice(0, -1);
    calculation.first = calculation.first.length == 0 ? '0' : calculation.first;
    input.value = calculation.first;
    return { calculation };
  }
  calculation.second = calculation.second.slice(0, -1);
  calculation.second = calculation.second.length == 0 ? '0' : calculation.second;
  input.value = calculation.second;
  return { calculation };
}
//count number digit after comma for method toFixed();
function NumberDigitAfterComma(calculation) {

  //variables store the number of decimal places
  let numberDigitFirst = 0;
  let numberDigitSecond = 0;

  calculation.first = calculation.first.toString();
  calculation.second = calculation.second.toString();

  if (calculation.first.includes('.')) {
    numberDigitFirst = calculation.first.split('.')[1].length;
  }
  if (calculation.second.includes('.')) {
    numberDigitSecond = calculation.second.split('.')[1].length;
  }
  //fractional value
  let fractionFirstNumber = calculation.first.split('.')[1];
  let fractionSecondNumber = calculation.second.split('.')[1];

  // check whether fractional parts are given when adding / subtracting an integer or not, if yes
  //then return the number of decimal places
  switch (calculation.sign) {
    case "+":
      if (+fractionFirstNumber + +fractionSecondNumber === 100)
        return 0;
      break;
    case "-":
      if (+fractionFirstNumber - +fractionSecondNumber === 0)
        return 0
      break;
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
//calc calculation.result
function calcResult(calculation) {
  switch (calculation.sign) {
    case '+':
      calculation.digitAfterComma = NumberDigitAfterComma(calculation);
      calculation.first = (+calculation.first) + (+calculation.second);
      break;
    case '-':
      calculation.digitAfterComma = NumberDigitAfterComma(calculation);
      calculation.first = (+calculation.first) - (+calculation.second);
      break;
    case '*':
      calculation.first = (+calculation.first) * (+calculation.second);
      calculation.digitAfterComma = calculation.first.split('.')[1]?.length;
      break;
    case '/':
      if (calculation.second === '0') {
        input.value = 'Деление на 0 невозможно';
        break;
      }
      calculation.first = (+calculation.first) / (+calculation.second);
      // if (calculation.first === 0) {
      //   calculation.first = 'Переполнение';
      //   return input.value = calculation.first;
      // }
      calculation.digitAfterComma = calculation.first.split('.')[1]?.length;
      break;
  }
  calculation.first = calculation.first.toFixed(calculation.NumberDigitAfterComma);
  input.value = +calculation.first;
  calculation.result = true;
}
//reverses the calculation.sign of a number
function signReversal(calculation) {
  if (calculation.second === '0' && calculation.sign === '') {
    calculation.first = -calculation.first;
    input.value = calculation.first;
  }
  else if (calculation.first !== '0' && calculation.second !== '0' && calculation.sign !== '' && !calculation.result) {
    calculation.second = -calculation.second;
    input.value = calculation.second;
  }
  else if (calculation.first !== '0' && calculation.second !== '0' && calculation.sign !== '') {
    calculation.first = -calculation.first;
    input.value = calculation.first;
  }
  else if (calculation.first !== '0' && calculation.sign !== '' && calculation.result) {
    calculation.second = '0';
    calculation.result = false;
  }
  else {
    calculation.second = -calculation.second;
    input.value = calculation.second;
  }
}
//divide one to number
function reciprocal(calculation) {
  if (calculation.second === '0' && calculation.sign === '') {
    calculation.first = 1 / calculation.first;
    input.value = calculation.first;
  }
  else if (calculation.first !== '0' && calculation.second !== '0' && calculation.sign !== '' && !calculation.result) {
    calculation.second = 1 / calculation.second;
    input.value = calculation.second;
  }
  else if (calculation.first !== '0' && calculation.second !== '0' && calculation.sign !== '') {
    calculation.first = 1 / calculation.first;
    input.value = calculation.first;
  }
  // The calculation.result indicates that the math operation has completed. And when using the calculation.result in other calculations, the calculation.first number will be equal to the calculation.result, and the calculation.second will be equal to the entered value
  else if (calculation.first !== '0' && calculation.sign !== '' && calculation.result) {
    calculation.second = '0';
    calculation.result = false;
  }
  else {
    calculation.second = 1 / calculation.second;
    input.value = calculation.second;
  }
}
//calc calculation.percent
function calcPercent(calculation) {
  calculation.percent = calculation.second;
  calculation.second = +calculation.first * +calculation.percent / 100;
  return input.value = calculation.second;
}
//calculates the square of a number
function square(calculation) {
  if (calculation.second === '0' && calculation.sign === '') {
    calculation.first = Math.pow(calculation.first, 2);
    input.value = calculation.first;
  }
  else if (calculation.first !== '0' && calculation.second !== '0' && calculation.sign !== '' && !calculation.result) {
    calculation.second = Math.pow(calculation.second, 2);
    input.value = calculation.second;
  }
  else if (calculation.first !== '0' && calculation.second !== '0' && calculation.sign !== '') {
    calculation.first = Math.pow(calculation.first, 2);
    input.value = calculation.first;
  }
  // The calculation.result indicates that the math operation has completed. And when using the calculation.result in other calculations, the calculation.first number will be equal to the calculation.result, and the calculation.second will be equal to the entered value
  else if (calculation.first !== '0' && calculation.sign !== '' && calculation.result) {
    calculation.second = Math.pow(calculation.first, 2);
    calculation.result = false;
  }
  else {
    calculation.second = Math.pow(calculation.second, 2);
    input.value = calculation.second;
  }
}
//calculates the square root of a number
function squareRoot(calculation) {
  if (calculation.second === '0' && calculation.sign === '') {
    calculation.first = Math.sqrt(calculation.first);
    input.value = calculation.first;
  }
  else if (calculation.first !== '0' && calculation.second !== '0' && calculation.sign !== '' && !calculation.result) {
    calculation.second = Math.sqrt(calculation.second);
    input.value = calculation.second;
  }
  else if (calculation.first !== '0' && calculation.second !== '0' && calculation.sign !== '') {
    calculation.first = Math.sqrt(calculation.first);
    input.value = calculation.first;
  }
  else if (calculation.first !== '0' && calculation.sign !== '' && calculation.result) {
    calculation.first = Math.sqrt(calculation.first);
    calculation.result = false;
  }
  else {
    calculation.second = Math.sqrt(calculation.second);
    input.value = calculation.second;
  }
}

function click(event, calculation) {

  if (!event.target.classList.contains('btn')) return
  let key = event.target.textContent;
  if (keyValues.includes(key)) {
    if (calculation.second === '0' && calculation.sign === '') {
      calculation.first = checkDigit(calculation.first, key);
      input.value = calculation.first;
    }
    // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the calculation.second will be equal to the entered value
    else if (calculation.first !== '' && calculation.sign !== '' && calculation.result) {
      calculation.second = '0';
      calculation.second = checkDigit(calculation.second, key);
      input.value = calculation.second;
      calculation.result = false;
    }
    else {      
      calculation.second = checkDigit(calculation.second, key);
      input.value = calculation.second;
    }
  }
  if (signsValues.includes(key)) {
    //prevent insertion of a sign into a number
    if(calculation.second !== '0' && !calculation.result) return; 

    calculation.sign = key;
    input.value = calculation.sign;
  }

  switch (key) {
    case 'CE':
      return !calculation.result ? ClearEntry(calculation) : null;
    case 'C':
      Clear(calculation);
      break;
    case '<=':
      ClearOneDigit(calculation);
      break;
    case '=':
      calcResult(calculation);
      break;
    case '+/-':
      signReversal(calculation);
      break;
    case '%':
      calcPercent(calculation);
      break;
    case '1/x':
      reciprocal(calculation);
      break;
    case 'x2':
      square(calculation);
      break;
    case '√X':
      squareRoot(calculation);
      break;
  }
}
function keyDown(event, calculation) {

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
    '%' : event.code && event.shiftKey ? null : event.code;
  
  if (keyCodes.includes(key)) {
      if (calculation.second === '0' && calculation.sign === '') {
        calculation.first = checkDigit(calculation.first, event.key);
        input.value = input.value.length > 16 ? input.value : calculation.first
      }
    // The calculation.result indicates that the math operation has completed. And when using the calculation.result in other calculations, the calculation.first number will be equal to the calculation.result, and the calculation.second will be equal to the entered value
    else if (calculation.first !== '' && calculation.sign !== '' && calculation.result) {
      calculation.second = '0';
      calculation.second = checkDigit(calculation.second, event.key);
      input.value = input.value.length > 16 ? input.value : calculation.second;
      calculation.result = false;
    }
    else {
      calculation.second = checkDigit(calculation.second, event.key);
      input.value = input.value.length > 16 ? input.value : calculation.second;
    }
  }
  if (signsCodes.includes(key)) {    
    //prevent insertion of a sign into a number
    if(calculation.second !== '0' && !calculation.result) return; 

    calculation.sign = event.key;
    input.value = calculation.sign;
  }

  switch (key) {
    case 'Delete':
      return !calculation.result ? ClearEntry(calculation) : null;
    case 'Escape':
      Clear(calculation);
      break;
    case 'Backspace':
      ClearOneDigit(calculation);
      break;
    case 'NumpadEnter':
      calcResult(calculation);
      break;
    case 'Enter':
      calcResult(calculation);
      break;
    case 'F9':
      signReversal(calculation);
      break;
    case '%':
      calcPercent(calculation);
      break;
    case 'KeyR':
      reciprocal(calculation);
      break;
    case 'KeyQ':
      square(calculation);
      break;
    case '√X':
      squareRoot(calculation);
      break;
  }
}
function keyUp(event) {
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
}
function mouseover(event, mouseObject) {
  if (event.target.classList.contains('btn')) {
    mouseObject.timer = setTimeout(() => {
      let anchorElem = event.target.closest('[data-tooltip]');
      if (!anchorElem) return;

      mouseObject.tooltip = document.createElement('div');
      mouseObject.tooltip.className = 'tooltip';
      mouseObject.tooltip.innerHTML = anchorElem.dataset.tooltip;

      document.body.append(mouseObject.tooltip);
      let coord = anchorElem.getBoundingClientRect();
      mouseObject.tooltip.style.top = coord.bottom + 'px';
      mouseObject.tooltip.style.left = coord.left + coord.width / 2 - mouseObject.tooltip.offsetWidth / 2 + 'px'
    }, 1000);
  }
}
function mouseout(event, mouseObject) {
  clearTimeout(mouseObject.timer);
  if (mouseObject.tooltip) {
    mouseObject.tooltip.remove();
    mouseObject.tooltip = false;
  }
}