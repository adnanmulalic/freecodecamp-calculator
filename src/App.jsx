import { useState } from 'react'
import './App.css'
import Operand from './Operand'
import Operator from './Operator'
import {shuntingyardalgo} from './shuntingyardalgo';

const initialCalculator = {
  display: "0"
}

function App() {
  const [calculator, setCalculator] = useState(initialCalculator);

  function calculate(event) {
    if (event.target.id === "clear") {
      clearAll();
    } else if (event.target.id === "deleteOne") {
      deleteOne();
    } else if (event.target.id === "equals") {
      deliverResult();
    } else if (event.target.className === "operand") {
      changeNumbers(event);
    } else if (event.target.className === "operator") {
      operate(event);
    } else {
      console.log("nothing ever works");
    }
  }

  const changeNumbers = (event)=> {
    if (event.target.id === "zero" && !calculator.display.match(/^0{1}/)) {
      setCalculator((prev) => ({...prev,
        display: prev.display.concat("", event.target.innerText) // set only one zero at the start if zero is clicked
      }));
    } else {
      if (calculator.display.match(/^0{1}/) && event.target.id != "decimal") { // replace zero at start with number if no decimal point
        setCalculator({...calculator, display: calculator.display.match(/^0{1}\./) ? calculator.display.concat("", event.target.innerText) : event.target.innerText})
      } else if(event.target.id === "decimal" && (calculator.display.match(/\d+$/) && !calculator.display.match(/\d+[.]\d+$/))) {  // check multiple decimal click to prevent multiple decimals
        setCalculator((prev) => ({...prev, display: prev.display.concat("", event.target.innerText)}))
      } else if (event.target.id != "decimal"){ // if not decimal add numbers
        setCalculator((prev) => ({...prev, display: prev.display.concat("", event.target.innerText)}))
      } 
    }
  }

  const operate = (event)=> {
    if ((calculator.display === "0" || calculator.display === "-" ) && event.target.id === "subtract") { //no number and want to make negative number
      setCalculator({...calculator, display: event.target.innerText});
    } else if (calculator.display.match(/^-?\d+/))  { // condition to prevent from changing first subtract symbol
      if (calculator.display.match(/[-+*/]{2}$/)) {//replace operator if already 2 operaters inputed
      setCalculator((prev) => ({...prev, display: prev.display.slice(0, -2).concat("", event.target.innerText)}));
    }
      else if (calculator.display.match(/[-+*/]{1}$/) && event.target.id != "subtract") { //replace operator if not subtract for negative number
      setCalculator((prev) => ({...prev, display: prev.display.slice(0, -1).concat("", event.target.innerText)}));
    }
      else if (calculator.display.match(/[-+*/]{1}$/) && event.target.id === "subtract"){ //add negativ operator for negative number
      setCalculator((prev) => ({...prev, display: prev.display.concat("", event.target.innerText)}));
    }
      else if (calculator.display.match(/-?\d*\.?\d/)) {// add operator
      setCalculator((prev) => ({...prev, display: prev.display.concat("", event.target.innerText)}));
    }
    }
  }

  function deliverResult() {
    setCalculator({ //...calculator,
      display: (calculator.display.length >= 3 && !calculator.display[calculator.display.length - 1].match(/[-+*/]/)) ? shuntingyardalgo(calculator.display): calculator.display,
    });
    //eval(calculator.display).toString() this is "easy" way
  }

  function deleteOne() {
    if (calculator.display.length > 1){
      setCalculator({
        display: calculator.display.slice(0, calculator.display.length - 1)
      });
    } else {
      clearAll();
    }
  }

  function clearAll() {
    setCalculator(initialCalculator);
  }
  

  return (
    <div id='calculator'>
      <p id='display'>{calculator.display}</p>
      <div onClick={calculate} id='calc-buttons'>
        <Operand number={7} id="seven" />
        <Operand number={8} id="eight" />
        <Operand number={9} id="nine" />
        <Operand number={4} id="four" />
        <Operand number={5} id="five" />
        <Operand number={6} id="six" />
        <Operand number={1} id="one" />
        <Operand number={2} id="two" />
        <Operand number={3} id="three" />
        <Operand number={0} id="zero" />
        <Operand number="." id="decimal" />
        <Operator operation="+" id="add" />
        <Operator operation="-" id="subtract" />
        <Operator operation="*" id="multiply" />
        <Operator operation="/" id="divide" />
        <button id='clear'>AC</button>
        <button id='deleteOne' className="material-symbols-outlined">backspace</button>
        <button id='equals'>=</button>
      </div>
    </div>
  )
}

export default App