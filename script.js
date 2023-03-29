let first = '0';
let second = '0';
let sign = '';
let result = false;
let digitAfterComma = 0;
let digit = ['0','1','2', '3','4','5','6','7','8','9','.'];
let signs = ['+','-','*','/'];
let display = document.querySelector('.display p');

function Clear() {
  first = '0';
  second = '0';
  sign = '';
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
  if(first !== '0' && sign === ''){
    first = first.slice(0,-1);
    return display.textContent = first;
  }
  second = second.slice(0,-1);
  display.textContent = second;
}
//count number digit after comma for method toFixed();
function NumberDigitAfterComma(first, second) {
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
  
  if(key === 'CE' && !result) {
    ClearEntry();    
  }

  if(key === 'C') {
    Clear();
  }

  if(key === 'clr') {
    ClearOneDigit();
  }
  if(key === '=') {
    if(!result) {
      digitAfterComma = NumberDigitAfterComma(first, second);
    }
    switch(sign) {
      case '+':
        first = (+first) + (+second);        
        break;
      case '-':
        first = (+first) - (+second);        
        break;
      case '*':
        first = (+first) * (+second);        
        break;
      case '/':
        if(second === '0') {
          display.textContent = 'Деление на ноль невозможно'; 
          break;     
        }
        first = (+first) / (+second);        
        break; 
    }
    first = first.toFixed(digitAfterComma);
    display.textContent = first;
    result = true;
  }
})