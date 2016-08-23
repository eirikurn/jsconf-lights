const createArtnet = require('artnet')
// const { Client: createClient } = require('artnet-node')
const { artnet: options } = require('./config')
const mapLightChannels = require('./mapping')

// const artnet = createClient(options.host, options.port)
const artnet = createArtnet(options)

function sendLights(lights) {
  artnet.set(1, 1, mapLightChannels(lights), function(err, res) {
    if (err) {
      console.log('ARTNET Error', err)
    }
  })
}

module.exports = sendLights
