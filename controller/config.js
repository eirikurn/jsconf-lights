const sharedConfig = require('./shared/config')

const config = module.exports = Object.assign({
  totalHarpaChannels: 108 * sharedConfig.channels,
  artnet: {
    iface: '2.0.0.1',
    port: 6454,
    host: '2.0.0.5',
    universe: 1,
  },
}, sharedConfig)
