const artnet = require('./artnet')
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
      console.log(`\nBye ${this.name}`)
    }

    this.name = name
    this.socket.join(name)
    console.log(`\nHi ${this.name}`)
  }

  onLights(lights) {
    this.socket.broadcast.to(this.name).emit('otherLights', lights)
    if (this.name === 'eirikurn') {
      artnet(mapLightChannels(lights))
    }
  }
  
  onDisconnect() {
    console.log(`\nBye ${this.name}`)
  }
}

module.exports = Client
