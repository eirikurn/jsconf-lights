const createArtnet = require('artnet')
const { artnet: options } = require('../config')

const artnet = createArtnet(options)

function send(channels, cb) {
  artnet.set(options.universe, 1, channels, cb)
}

module.exports = send
