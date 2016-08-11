import io from 'socket.io-client'
import Lights from './lights'

class Connection {
  handlers = []
  socket = null

  constructor(url) {
    this.socket = io.connect(url)
    this.socket.on('lights', this.onReceiveLights)
  }

  onReceiveLights = ({ lights }) => {
    this.handlers.forEach(handler => handler(new Lights(lights)))
  }

  addChangeListener(handler) {
    this.handlers.push(handler)
    return () => {
      this.handlers = this.handlers.filter(h => h !== handler)
    }
  }

  send(lights) {
    this.socket.emit('change', { lights })
  }
}

export default Connection
