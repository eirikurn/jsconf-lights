const sharedConfig = require('./shared/config')

const config = module.exports = Object.assign({
  totalHarpaChannels: 108 * sharedConfig.channels,
  artnet: {
    iface: '2.0.0.2',
    port: 6454,
    host: '2.0.0.3',
    universe: 0,
  },
}, sharedConfig)
