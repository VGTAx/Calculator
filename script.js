let first = '';
let second = '';
let sign = '';
let result = false;

let digit = ['0','1','2', '3','4','5','6','7','8','9','.'];
let signs = ['+','-','*','/'];
let display = document.querySelector('.display p');

function checkDoubleDot(number){  
  return number.includes('.');
}

function Clear(){
  first = '';
  second = '';
  sign = '';
  result = false;
  display.textContent = '0';
}

function ClearEntry() {
  if(first !== '' && sign === ''){
    display.textContent = 0;
    return first = '';     
  }  
  display.textContent = 0;
  return second = '';
}

function ClearOneDigit() {
  if(first !== '' && sign === ''){
    first = first.slice(0,-1);
    return display.textContent = first;
  }
  second = second.slice(0,-1);
  display.textContent = second;
}

document.addEventListener('click', (event) => {
  if(!event.target.classList.contains('btn')) return
  let key = event.target.textContent;
  if(digit.includes(key)) {
    if(second === '' && sign === ''){
      first = key === '.' && checkDoubleDot(first) ? first : 
          first === '' && key == '0' ?  key : 
          first === '' ? '0'+key : first+key;      
      // first = first === '' && key !== '.' ? key : 
      //   first === '' && key === '.' ? '0' + key :
      //   first === '0' && key === '.' ?  first+key : key  
      display.textContent = first;
    }
    else if (first !== '' && sign !== '' && result){      
      second = '';
      second = key === '.' && checkDoubleDot(second) ? second : second+=key;
      display.textContent = second;
      result = false;
    }
    else {
      second = key === '.' && checkDoubleDot(second) ? second : second+=key;
      display.textContent = second;
    }    
  }
  if(signs.includes(key)){
    sign = key;
    display.textContent = sign;
  }
  
  if(key === 'CE') {
    ClearEntry();
  }

  if(key === 'C') {
    Clear();
  }

  if(key === 'clr') {
    ClearOneDigit();
  }
  if(key === '=') {
    if(second === '0') {
      return display.textContent = 'Деление на ноль невозможно';      
    }
    
    switch(sign) {
      case '+':
        first = (+first) + (+second);
        display.textContent = first;
        break;
      case '-':
        first = (+first) - (+second);
        display.textContent = first;
        break;
      case '*':
        first = (+first) * (+second);
        display.textContent = first;
        break;
      case '/':
        first = (+first) / (+second);
        display.textContent = first;
        break; 
    }
    result = true;
  }
})