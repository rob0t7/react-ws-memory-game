import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Square from './Square'

var gridColors = [
  'grey',
  'red',
  'blue',
  'green',
  'orange'
]

var style = {
  app: {
    width: '1000px',
    margin: '30px  auto'
  },
  container : {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      grid: []
    }
  }

  componentDidMount() {
    var ws = new WebSocket('ws://localhost:8000')
    ws.onopen = (e) => {
      console.log("Opened WS connection")
      this.ws = e.target
      this.ws.onmessage = this.handleMessage
    }
  }

  handleMessage = (res) => {
    this.setState({grid: JSON.parse(res.data).grid})
  }

  handleClick = (e) => {
    var message = {position: e.target.dataset.id}
    this.ws.send(JSON.stringify(message))
  }

  render() {
    return (
      <div style={style.app}>
        <h1 style={{width: '100%'}}>LHL Battleship Grid</h1>
        <div style={style.container}>
          { this.state.grid.map ( (sq,i) => <Square key={i} color={gridColors[sq]} handleClick={this.handleClick} id={i}/>) }
        </div>
      </div>
    )
  }
}

export default App;
