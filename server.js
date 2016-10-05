'use strict'

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 8000})

var solutions = [
  2, 1, 1, 2,
  2, 2, 3, 4,
  4, 3, 1, 1
]

var grid = [
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0
]
var originalGrid = grid;
var clicks = 0

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({grid: grid}))
  ws.send(JSON.stringify({type: 'message', message: 'Hi'}))

  ws.on('message', (message) => {
    var position = JSON.parse(message).position

    grid = grid.slice(0)
    grid[position] = solutions[position]
    clicks += 1

    if (clicks > 2) {
      clicks = 0
      grid = originalGrid
      wss.clients.forEach( client => {
        wss.send(JSON.stringify({grid: grid}))
      })
    } else {
      wss.clients.forEach( client => {
        client.send(JSON.stringify({grid: grid}))
      })
    }
  })


})
