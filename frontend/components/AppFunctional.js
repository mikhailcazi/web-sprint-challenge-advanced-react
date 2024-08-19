import React, { useEffect, useState } from 'react'
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const baseURL = 'http://localhost:9000/api/result'

// const fetchData = async (payload) => {
//   await axios.post(baseURL, payload)
//   .then(res => res)
//   .then(res => {
//     console.log(res.data.message)
//     return res.data.message
//   })
// }

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [position, setPosition] = useState(initialIndex)
  const [steps, setSteps] = useState(initialSteps)
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)

  useEffect(() => {
    console.log(getXYMessage())
    console.log(email)
  })

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = position % 3 + 1
    const y = Math.floor(position / 3) + 1
    
    return {x, y}
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const xy = getXY()
    return `Coordinates (${xy.x}, ${xy.y})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setPosition(initialIndex)
    setSteps(0)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const xy = getXY()
    let nextIndex = position
    switch(direction) {
      case 'left':
          nextIndex -= (xy.x > 1) ? 1 : 0
      break;
      case 'right':
          nextIndex += (xy.x < 3) ? 1 : 0
        break;
      case 'up':
        nextIndex -= (xy.y > 1) ? 3 : 0
        break;
      case 'down':
        nextIndex += (xy.y < 3) ? 3 : 0
        break;
      default:
        console.error("What other cardinal directions could there be???")           
    }
    return nextIndex
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id
    const nextIndex = getNextIndex(direction)
    if(nextIndex != position) {
      setPosition(nextIndex)
      setSteps(steps + 1)
      setMessage('')
    } else {
      setMessage("You can't go " + direction)
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    const xy = getXY()
    const payload = { "x": xy.x, "y": xy.y, "steps": steps, "email": email }
    // fetchData(payload)
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} time{(steps != 1) ? 's' : ''}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === position ? ' active' : ''}`}>
              {idx === position ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
