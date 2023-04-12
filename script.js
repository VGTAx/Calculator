import { click, keyDown, keyUp, mouseover, mouseout } from './functions.js';

let calculation = {
  first: '0', //first Number
  second: '0', //second Number
  result: false, //The variable indicates that the math operation has completed. 
  sign: '', // sign
  percent: 0, //store percent
  digitAfterComma: 0,// the varibale stores the count of digit after comma in  // float number. 
  //Its use for function toFixed() 
};

let mouseObject = {
  tooltip: null, //store tooltip with hotkey
  timer: null,//store id timer in Function Mouseover 
}

document.addEventListener('click', (event) => {
  click(event, calculation);
});

document.addEventListener('keydown', (event) => {
  keyDown(event, calculation);
});

document.addEventListener('keyup', keyUp);

document.addEventListener('mouseover', (event) => {
  mouseover(event, mouseObject);
});

document.addEventListener('mouseout', (event) => {
  mouseout(event, mouseObject);
})