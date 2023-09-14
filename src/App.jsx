import { useState } from 'react'
import './App.css'
import Operand from './Operand'
import Operator from './Operator'
import * as operations from './operations'

const initialCalculator = {
  firstNumber: "", secondNumber: "", 
  operator: "", input: "",
  display: "", negativeNumber: false,
}


function App() {
  const [calculator, setCalculator] = useState(initialCalculator);
  let result = operations.operations(calculator.firstNumber, calculator.secondNumber, calculator.operator);


  const changeNumbers = (event)=> {
    setCalculator((prev) => ({...prev,
      input: prev.input.concat("", event.target.innerText),
      display: prev.display.concat("", event.target.innerText)
    }))
    setCalculator((prev) => {
      if (prev.operator === "") {
        return {...prev,
            firstNumber: prev.firstNumber.concat("", event.target.innerText),
          }
      } else {
        return {...prev,
          secondNumber: prev.secondNumber.concat("", event.target.innerText),
        }
      }
    });
  }

  const operate = (event)=> {
  if (!calculator.display.match(/([(*\-)|(/\-)|(+\-)]{2}\s*$)/)) {
    if (calculator.operator != "" && calculator.secondNumber != "") {
      setCalculator((prev) => ({...prev,
      display: prev.operator != "subtract" && prev.display.concat("", event.target.innerText),
      firstNumber: result,
      secondNumber: "",
      operator: event.target.id
      }))
      
    } else if (calculator.operator && event.target.id != "subtract") {
      setCalculator((prev) => ({...prev,
        operator: event.target.id,
        display: prev.firstNumber.concat("", event.target.innerText)
      }))
      console.log("this ran")
    }
    else if (calculator.operator && event.target.id === "subtract") {
      setCalculator((prev) => ({...prev,
      display: prev.display.concat("", event.target.innerText),
      secondNumber: prev.secondNumber.concat("-"),
      negativeNumber: true
      }))
    }
     else {
      setCalculator((prev) => ({...prev,
        operator: event.target.id,
        display: prev.display.concat("", event.target.innerText)
        }))
        console.log("last else ran")
    }
  } 
  }

  function deliverResult() {
    setCalculator({...calculator,
      display: result,
      firstNumber: result,
      secondNumber: "",
      operator: ""
    })
  }

  function clearAll() {
    setCalculator(initialCalculator);
  }

  console.log(calculator)
  return (
    <div>
      <button onClick={clearAll} id='clear'>AC</button>
      <div onClick={changeNumbers}>
        <Operand number={0} id="zero" />
        <Operand number={1} id="one" />
        <Operand number={2} id="two" />
        <Operand number={3} id="three" />
      </div>
      <div onClick={operate}>
        <Operator operation="+" id="add" />
        <Operator operation="-" id="subtract" />
        <Operator operation="*" id="multiply" />
      </div>
      <button onClick={deliverResult} id='result'>=</button>
      <p>Display: {calculator.display}</p>
      <label htmlFor='input'>Input: </label>
      <input type='number' id='input' name='input' value={calculator.input} readOnly></input>
      <p>Result: {}</p>
    </div>
  )
}

export default App

{/* <button id='zero'>0</button><button id='one'>1</button><button id='two'>2</button><button id='3'>3</button>
      <button id='4'>4</button><button id='5'>5</button><button id='6'>6</button>
      <button id='7'>7</button><button id='8'>8</button><button id='9'>9</button> */}
