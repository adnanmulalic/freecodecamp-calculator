import { useState } from 'react'
import './App.css'
import Operand from './Operand'
import Operator from './Operator'
import {shuntingyardalgo} from './shuntingyardalgo';

const initialCalculator = {
  display: ""
}


function App() {
  const [calculator, setCalculator] = useState(initialCalculator);
  let anotherResult = calculator.display;

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
    if ((calculator.display === "" || calculator.display === "-" ) && event.target.id === "subtract") { //no number and want to make negative number
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
    setCalculator({...calculator,
      display: eval(calculator.display).toString(),
    });
    shuntingyardalgo(calculator.display);
  }

  function clearAll() {
    setCalculator(initialCalculator);
  }
  

  return (
    <div>
      <button onClick={clearAll} id='clear'>AC</button>
      <div onClick={changeNumbers}>
        <Operand number={0} id="zero" />
        <Operand number={1} id="one" />
        <Operand number={2} id="two" />
        <Operand number={3} id="three" />
        <Operand number="." id="decimal" />
      </div>
      <div onClick={operate}>
        <Operator operation="+" id="add" />
        <Operator operation="-" id="subtract" />
        <Operator operation="*" id="multiply" />
        <Operator operation="/" id="divide" />
      </div>
      <button onClick={deliverResult} id='result'>=</button>
      <p>Display: {calculator.display}</p>
      <label htmlFor='input'>Input: </label>
      <input type='number' id='input' name='input' value={calculator.input} readOnly></input>
      <p>Another result:  </p>
    </div>
  )
}

export default App