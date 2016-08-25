// HACK! Running out of time.
if (process.argv[2] === 'null') {
  module.exports = require('./null-artnet')
} else if (process.argv[2] === 'artnet') {
  module.exports = require('./artnet')
} else if (process.argv.length < 3 || process.argv[2] === 'raw') {
  module.exports = require('./raw-artnet')
}
