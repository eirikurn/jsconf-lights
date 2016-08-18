import {
  totalRows,
  totalCols,
  totalChannels,
  channels,
} from './config'

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
      this.data = new Array(totalChannels + 1)
      for (let i = 0; i < totalChannels; i++) {
        this.data[i] = 0
      }
    }
  }

  clone() {
    return new Lights(this.data.slice())
  }

  setCol(col, ...colors) {
    if (!colors[0]) {
      throw new Error('Missing color data')
    }
    const colIndex = col * totalRows * channels
    for (let row = 0; row < totalRows; row++) {
      const color = colors[row] === undefined ? colors[0] : colors[row]
      if (color !== null) {
        this.data[colIndex + row * channels + 0] = color[0]
        this.data[colIndex + row * channels + 1] = color[1]
        this.data[colIndex + row * channels + 2] = color[2]
      }
    }
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
