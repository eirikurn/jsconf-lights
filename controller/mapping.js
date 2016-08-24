'use strict'
const {
    leftCols,
    frontCols,
    rightCols,
    backCols,
    totalCols,
    totalRows,
    totalChannels,
    channels,
    totalHarpaChannels,
} = require('./shared/config')

// A mapping from virtual light grid to harpa light units.
const lightMap = {}
function define(fromCol, fromRow, toStart, count = 1) {
  const fromIndex = fromCol * totalRows + fromRow
  for (let i = 0; i < count; i++) {
    lightMap[fromIndex + i * totalRows] = toStart + i
  }
}

// Left wall (West)
let col = 0
define(col, 0, 0, leftCols)
define(col, 1, 16, leftCols)
define(col + 7, 1, 27)
define(col + 11, 1, 31)
define(col + 15, 1, 23)

// Front wall (North)
col += leftCols
define(col, 1, 32, frontCols)
define(col, 0, 44, frontCols)

// Right wall (East)
col += frontCols
define(col, 0, 56, rightCols)
define(col, 1, 72, rightCols)

// Back wall (South)
col += rightCols
define(col, 0, 88, backCols)
define(col, 1, 100, 3)
define(col + 9, 1, 104, 3)

/**
 * Maps a lights object to harpa channel data.
 * @param {Light} lights
 * @returns {Array}
 */
function mapLightChannels(lights) {
  const channelData = new Array(totalHarpaChannels)
  for (let col = 0; col < totalCols; col++) {
    for (let row = 0; row < totalRows; row++) {
      const unit = lightMap[col * totalRows + row]
      if (unit == null) continue

      const fromChannel = col * totalRows * channels + row * channels
      const toChannel = unit * channels
      channelData[toChannel + 0] = lights[fromChannel + 0]
      channelData[toChannel + 1] = lights[fromChannel + 1]
      channelData[toChannel + 2] = lights[fromChannel + 2]
    }
  }
  return channelData
}

module.exports = mapLightChannels
