'use strict'
const io = require('socket.io')()
const Client = require('./client')

io.listen(8081)
io.on('connection', socket => {
  new Client(socket)
})
