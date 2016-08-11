/* eslint-disable */
const { totalCols } = config

// Debug later:
// function test() {}
// console.log(test)

const update = function(currentLights, time) {
  const colIndex = Math.round(time * 20 % totalCols)

  const newLights = new Lights()
  newLights.setCol(colIndex, [255, 0, 0])

  return newLights
}

// Registers a visualization.
register(update)
