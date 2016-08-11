const io = require('socket.io')()

io.listen(8081)

const lights = [[255, 0, 255], [255, 0, 0], [0, 0, 255]]

io.on('connection', socket => {
  emitLights(socket)
  socket.emit('lights', { lights })
  socket.on('change', (data) => {
    lights = data.lights
    emitLights(socket)
  })
})

const emitLights = socket => {
  socket.emit('lights', { lights })
}
