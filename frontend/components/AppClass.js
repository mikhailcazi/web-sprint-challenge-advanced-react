// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
import React from 'react'
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}
const baseURL = 'http://localhost:9000/api/result'


export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor() {
    super()
    this.state = {
      position: initialIndex,
      steps: initialSteps,
      message: initialMessage,
      email: initialEmail
    }

    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      console.log(error)
      return error.response
    });


  }

  fetchData = (payload) => {
    axios.post(baseURL, payload)
    .then(res => {
      console.log(res)
      return res
    })
    .then(res => {
      this.setState({
        message: res.data.message,
        email: initialEmail
      })
    })
    .catch((err) => console.log(err))
  }
  

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = this.state.position % 3 + 1
    const y = Math.floor(this.state.position / 3) + 1
    
    return {x, y}
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const xy = this.getXY()
    return `Coordinates (${xy.x}, ${xy.y})`  
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      position: initialIndex,
      steps: initialSteps,
      message: initialMessage,
      email: initialEmail
    })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const xy = this.getXY()
    let nextIndex = this.state.position
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

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id
    const nextIndex = this.getNextIndex(direction)
    if(nextIndex != this.state.position) {
      this.setState({
        position: nextIndex,
        steps: this.state.steps + 1,
        message: initialMessage
      })
    } else {
      this.setState({
        message: "You can't go " + direction
      })
    }
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      email: evt.target.value 
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    const xy = this.getXY()
    const payload = { "x": xy.x, "y": xy.y, "steps": this.state.steps, "email": this.state.email }
    this.fetchData(payload)
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <p>(This component is not required to pass the sprint)</p>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} time{(this.state.steps != 1) ? 's' : ''}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.position ? ' active' : ''}`}>
                {idx === this.state.position ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
