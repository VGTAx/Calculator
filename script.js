
let first = '0';
let second = '0';
let sign = '';
let result = false;
let percent = '0'
let digitAfterComma = 0;
let digit = ['0','1','2', '3','4','5','6','7','8','9','.'];
let signs = ['+','-','*','/'];
let display = document.querySelector('.display p');

function Clear() {
  first = '0';
  second = '0';
  sign = '';
  percent = '0';
  result = false;
  display.textContent = '0';
}

function ClearEntry() {
  if(first !== '0' && sign === ''){
    display.textContent = 0;
    return first = '0';     
  }  
  display.textContent = 0;
  return second = '0';
}

function ClearOneDigit() {
  if(fisrt !== '0' && second !=='0' && sign !== '') return;
  if(first !== '0' && sign === ''){
    first = first.slice(0,-1);
    return display.textContent = first;
  }
  second = second.slice(0,-1);
  display.textContent = second;
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
  else if (first !== '0' && sign !== '' && result){      
    second = '0';
    result = false;
  }
  else {
    second = 1/second;
    display.textContent = second;
  }   
}
function calcPercent(){ 
  percent = second;
  second = +first * +percent/100 ;  
  return display.textContent = second; 
}
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
  else if (first !== '0' && sign !== '' && result){      
    second = Math.pow(first,2);
    result = false;
  }
  else {
    second = Math.pow(second,2);
    display.textContent = second;
  }   
}

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
  if(digit.includes(key)) {
    if(second === '0' && sign === ''){       
      first = checkDigit(first,key); 
      display.textContent = first;
    }
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
  if(signs.includes(key)){
    sign = key;
    display.textContent = sign;
  }
  

  switch(key) {
    case 'CE':
      return !result ? ClearEntry() : null;
    case 'C':
      Clear();
      break;
    case 'clr':
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