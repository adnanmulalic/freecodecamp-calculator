import { useState } from 'react'
import './App.css'
import Operand from './Operand'
import Operator from './Operator'

function App() {
  const [number, setNumber] = useState(0);
  const [operator, setOperator] = useState();

  const calculate = (event)=> {
    if(event.target.type === "button") {

    }
  }

  return (
    <div onClick={calculate}>
      <Operand number={1} id="one" />
      <Operand number={2} id="two" />
      <Operand number={3} id="three" />
      <Operator operation="+" id="add" />
      <p>Result: {}</p>
    </div>
  )
}

export default App

{/* <button id='zero'>0</button><button id='one'>1</button><button id='two'>2</button><button id='3'>3</button>
      <button id='4'>4</button><button id='5'>5</button><button id='6'>6</button>
      <button id='7'>7</button><button id='8'>8</button><button id='9'>9</button> */}
