const { totalCols } = config

function update(currentLights, time) {
  const colIndex = Math.round(time * 20 % totalCols)

  const newLights = new Lights()
  const color = Color().hsl(time * 25 % 360, 100, 50)
  newLights.set(colIndex, color)

  return newLights
}

// Registers a visualization.
register(update)
