const artnet = require('./raw-artnet')
const mapLightChannels = require('./mapping')

class Client {
  constructor(socket) {
    this.socket = socket
    this.name = null
    socket.on('join', this.onHello.bind(this))
    socket.on('lights', this.onLights.bind(this))
    socket.on('disconnect', this.onDisconnect.bind(this))
  }

  onHello(name) {
    if (this.name) {
      this.socket.leave(this.name)
    }

    this.name = name
    this.socket.join(name)
  }

  onLights(lights) {
    this.socket.broadcast.to(this.name).emit('lights', lights)
    artnet(mapLightChannels(lights))
  }
  
  onDisconnect() {
    console.log(`bye ${this.name}`)
  }
}

module.exports = Client
