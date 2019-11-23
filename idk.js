var express = require('express')
var app = express()
var serv = require('http').Server(app)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html')
})
app.use('/client', express.static(__dirname + '/client'))

serv.listen(2060)
console.log('Server started')

var SOCKET_LIST = {}
var PLAYER_LIST = {}

var Player = function (id) {
  var self = {
    x: 250,
    y: 250,
    id: id,
    number: '' + Math.floor(10 * Math.random())
  }
  return self
}

var io = require('socket.io')(serv, {})
io.sockets.on('connection', function (socket) {
  socket.id = Math.random()
  SOCKET_LIST[socket.id] = socket
  console.log('socket connection')

  var player = Player(socket.id)
  PLAYER_LIST[socket.id] = player

  socket.on('disconnect', function () {
    delete SOCKET_LIST[socket.id]
    delete PLAYER_LIST[socket.id]
  })
})

setInterval(function () {
  var pack = []
  for (var i in PLAYER_LIST) {
    var player = PLAYER_LIST[i]
    player.x++
    player.y++
    pack.push({
      x: player.x,
      y: player.y,
      number: player.number
    })
  }
  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i]
    socket.emit('newPositions', pack)
  }
}, 1000 / 25)
