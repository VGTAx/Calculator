
let first = '0'; //first Number
let second = '0'; //second Number
let sign = ''; // sign
let result = false; //The variable indicates that the math operation has completed. 
let percent = 0; // the variable stores the value %
let digitAfterComma = 0; // the varibale stores the count of digit after comma in 
                        // float number. Its use for function toFixed()
let keyValues = ['0','1','2', '3','4','5','6','7','8','9','.']; 
let keyCodes = ['Digit0','Digit1', 'Digit2', 'Digit3', 'Digit4', 
                  'Digit5','Digit6','Digit7', 'Digit8', 'Digit9', 
                  'Numpad0', 'Numpad1','Numpad2','Numpad3','Numpad4',
                  'Numpad5','Numpad6','Numpad7','Numpad8','Numpad9']; // key
let signsValues = ['+','-','*','/'];
let signsCodes = ['NumpadAdd','NumpadSubtract', 'NumpadDivide', 'NumpadMultiply'];
let display = document.querySelector('.display p');
//Clear all values 
function Clear() {
  first = '0';
  second = '0';
  sign = '';
  percent = '0';
  result = false;
  display.textContent = '0';
}
//Clear current enter value
function ClearEntry() {
  if(first !== '0' && sign === ''){
    display.textContent = 0;
    return first = '0';     
  }  
  display.textContent = 0;
  return second = '0';
}
//Clear one digit of number
function ClearOneDigit() {
  if(first !== '0' && second !=='0' && result) return;
  if(first !== '0' && sign === ''){
    first = first.slice(0,-1);
    return display.textContent = first.length == 0 ? '0' : display.textContent = first;
  }
  second = second.slice(0,-1);
  display.textContent = second.length > 0 ? display.textContent = second : 0;
}
//count number digit after comma for method toFixed();
function NumberDigitAfterComma(first, second, sign) {
  
  //переменные хранят кол-во знаков дробной части числа
  let numberDigitFirst = 0;
  let numberDigitSecond = 0;
  first = first.toString();
  second = second.toString();
 
  if(first.includes('.')) {    
    numberDigitFirst  = first.split('.')[1].length;    
  }
  if (second.includes('.')) {
    numberDigitSecond = second.split('.')[1].length;
  }
  //значения дробные части чисел
  let fractionFirstNumber = first.split('.')[1];
  let fractionSecondNumber =  second.split('.')[1];

  //проверяем дают дробные части при сложении/вычитании целое число или нет, если да
  //то возвращаем кол-во знаков после запятой
  switch(sign) {    
    case "+" :
      if(+fractionFirstNumber + +fractionSecondNumber === 100) return 0
    case "-":  
    if(+fractionFirstNumber - +fractionSecondNumber === 0) return 0
  }

  return numberDigitFirst >= numberDigitSecond ? numberDigitFirst : numberDigitSecond;
}
//Checks for a dot in a number 
function checkDigit(number, key) {
  if(number === '0') {
    if(key === '.') {
      return number +=key
    }
    return number = key;
  }
  if(number !== '0') {
    if(number.includes('.') && key === '.') {
      return number
    } 
    return number += key;
  }
}
//calc result
function calcResult() {
  switch(sign) {
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
      if(second === '0') {
        display.textContent = 'Деление на ноль невозможно'; 
        break;     
      }
      first = (+first) / (+second);     
      if(first === 0) {
        first = 'Переполнение';
        return display.textContent = first;          
      }
      digitAfterComma = first.toString().split('.')[1]?.length;    
      break; 
  }    
  first = first.toFixed(digitAfterComma);
  display.textContent = first;
  result = true;
}
//reverses the sign of a number
function signReversal(){
  if(second === '0' && sign === ''){
    first = -first;
    display.textContent = first;
  }  
  else if (first !== '0' && second !== '0' && sign !== '' && !result){
    second = -second;
    display.textContent = second;
  }  
  else if (first !== '0' && second !== '0' && sign !== ''){
    first = -first;
    display.textContent = first;
  }  
  else if (first !== '0' && sign !== '' && result){      
    second = '0';
    result = false;
  }
  else {
    second = -second;
    display.textContent = second;
  }    
}
//divide one to number
function oneToShare() {
  if(second === '0' && sign === ''){
    first = 1/first;
    display.textContent = first;
  } 
  else if (first !== '0' && second !== '0' && sign !== '' && !result){
    second = 1/second;
    display.textContent = second;
  }  
  else if (first !== '0' && second !== '0' && sign !== ''){
    first = 1/first;
    display.textContent = first;
  }  
  // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the second will be equal to the entered value
  else if (first !== '0' && sign !== '' && result){      
    second = '0';
    result = false;
  }
  else {
    second = 1/second;
    display.textContent = second;
  }   
}
//calc percent
function calcPercent(){ 
  percent = second;
  second = +first * +percent/100 ;  
  return display.textContent = second; 
}
//calculates the square of a number
function square(){
  if(second === '0' && sign === ''){
    first = Math.pow(first,2);
    display.textContent = first;
  }    
  else if (first !== '0' && second !== '0' && sign !== '' && !result){
    second = Math.pow(second,2);
    display.textContent = second;
  }  
  else if (first !== '0' && second !== '0' && sign !== ''){
    first = Math.pow(first,2);
    display.textContent = first;
  }  
  // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the second will be equal to the entered value
  else if (first !== '0' && sign !== '' && result){      
    second = Math.pow(first,2);
    result = false;
  }
  else {
    second = Math.pow(second,2);
    display.textContent = second;
  }   
}
//calculates the square root of a number
function squareRoot() {
  if(second === '0' && sign === ''){
    first = Math.sqrt(first);
    display.textContent = first;
  }  
  else if (first !== '0' && second !== '0' && sign !== '' && !result){
    second = Math.sqrt(second);
    display.textContent = second;
  }  
  else if (first !== '0' && second !== '0' && sign !== ''){
    first = Math.sqrt(first);
    display.textContent = first;
  }  
  else if (first !== '0' && sign !== '' && result){      
    first = Math.sqrt(first);
    result = false;
  }
  else {
    second = Math.sqrt(second);
    display.textContent = second;
  }  
}
document.addEventListener('click', (event) => {
  if(!event.target.classList.contains('btn')) return
  let key = event.target.textContent;  
  if(buttonValues.includes(key)) {
    if(second === '0' && sign === ''){       
      first = checkDigit(first,key); 
      display.textContent = first;
    }
    // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the second will be equal to the entered value
    else if (first !== '' && sign !== '' && result){      
      second = '0';
      second = checkDigit(second,key);
      display.textContent = second;
      result = false;
    }
    else {
      second = checkDigit(second, key);
      display.textContent = second;
    }    
  }
  if(signsValues.includes(key)){
    sign = key;
    display.textContent = sign;
  }
  

  switch(key) {
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

document.addEventListener('keydown', (event) => {
  
  let key = event.code == 'Digit5' && event.shiftKey ?
            '%' : event.code; 
  if(buttonValues.includes(key)) {
    if(second === '0' && sign === ''){       
      first = checkDigit(first,event.key); 
      display.textContent = first;
    }
    // The result indicates that the math operation has completed. And when using the result in other calculations, the first number will be equal to the result, and the second will be equal to the entered value
    else if (first !== '' && sign !== '' && result){      
      second = '0';
      second = checkDigit(second,event.key);
      display.textContent = second;
      result = false;
    }
    else {
      second = checkDigit(second, event.key);
      display.textContent = second;
    }    
  }
  if(signsValues.includes(key)){
    sign = event.key;
    display.textContent = sign;
  }  

  switch(key) {
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