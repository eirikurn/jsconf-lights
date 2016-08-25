import {
  totalRows,
  totalCols,
  totalChannels,
  channels,
} from './shared/config'
import parseColor from 'color'

class Lights {
  data = []

  constructor(data) {
    if (data && data.length !== totalChannels) {
      throw new Error(
        `Passed in light data of incorrect size.
        Should have ${totalChannels} channels.`
      )
    }
    if (data) {
      this.data = data
    } else {
      this.data = new Array(totalChannels)
      for (let i = 0; i < totalChannels; i++) {
        this.data[i] = 0
      }
    }
  }

  clone() {
    return new Lights(this.data.slice())
  }

  get(col, row = 0) {
    const colIndex = col * totalRows * channels
    return [
      this.data[colIndex + row * channels + 0],
      this.data[colIndex + row * channels + 1],
      this.data[colIndex + row * channels + 2],
    ]
  }

  set(col, ...colors) {
    if (!colors.some(color => !!color)) {
      throw new Error('Missing color data')
    }
    if (col < 0 || col >= totalCols) {
      throw new Error(`Column ${col} out of bounds. 0 <= x < ${totalCols}`)
    }
    const colIndex = col * totalRows * channels
    for (let row = 0; row < totalRows; row++) {
      const color = colors[row] === undefined ? this.formatColor(colors[0]) : this.formatColor(colors[row])
      if (color !== null) {
        this.data[colIndex + row * channels + 0] = color[0]
        this.data[colIndex + row * channels + 1] = color[1]
        this.data[colIndex + row * channels + 2] = color[2]
      }
    }
  }

  formatColor(color) {
    if (color === null) {
      return color
    }
    if (color && color.length === 3) {
      return color
    }
    return parseColor(color).rgbArray()
  }

  mapLights(handler) {
    const result = []
    for (let col = 0; col < totalCols; col++) {
      const colIndex = col * totalRows * channels
      for (let row = 0; row < totalRows; row++) {
        result.push(
          handler(
            col,
            row,
            this.data[colIndex + row * channels + 0],
            this.data[colIndex + row * channels + 1],
            this.data[colIndex + row * channels + 2]
          )
        )
      }
    }
    return result
  }
}

export default Lights
