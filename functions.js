'use strict';

import {first, second, sign, result, percent, input}
from './script.js';
let digitAfterComma = 0; // the varibale stores the count of digit after comma in 
// float number. Its use for function toFixed()
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
        //digitAfterComma = NumberDigitAfterComma(first, second, sign);
        first = 10 ;
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
    first = first.toString().toFixed(digitAfterComma);
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

export {
  Clear, ClearEntry, ClearOneDigit, NumberDigitAfterComma,
  checkDigit, calcResult, signReversal,
  oneToShare, calcPercent, square, squareRoot
}