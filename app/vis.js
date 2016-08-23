import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Surface,
  Group,
  Shape,
  Path,
  Text,
} from 'react-art'
import {
  leftCols,
  frontCols,
  rightCols,
  backCols,
} from './shared/config'

const lightHeight = 30
const lightWidth = 16
const whitespace = 4
const totalWidth = lightHeight * 4 + frontCols * lightWidth + whitespace
const totalHeight = lightHeight * 4 + Math.max(leftCols, rightCols) * lightWidth + whitespace
const layout = [
  {
    fromCol: 0,
    toCol: leftCols,
    startX: whitespace,
    startY: whitespace + lightHeight * 2 + Math.floor((leftCols - 0.5) * lightWidth),
    colX: 0,
    colY: -lightWidth,
    rowX: lightHeight,
    rowY: 0,
    width: lightHeight - whitespace,
    height: lightWidth - whitespace,
  },
  {
    fromCol: leftCols,
    toCol: leftCols + frontCols,
    startX: whitespace + lightHeight * 2,
    startY: whitespace,
    colX: lightWidth,
    colY: 0,
    rowX: 0,
    rowY: lightHeight,
    width: lightWidth - whitespace,
    height: lightHeight - whitespace,
  },
  {
    fromCol: leftCols + frontCols,
    toCol: leftCols + frontCols + rightCols,
    startX: whitespace + lightHeight * 3 + frontCols * lightWidth,
    startY: whitespace + lightHeight * 2,
    colX: 0,
    colY: lightWidth,
    rowX: -lightHeight,
    rowY: 0,
    width: lightHeight - whitespace,
    height: lightWidth - whitespace,
  },
  {
    fromCol: leftCols + frontCols + rightCols,
    toCol: leftCols + frontCols + rightCols + backCols,
    startX: whitespace + lightHeight * 2 + frontCols * lightWidth - lightWidth,
    startY: whitespace + lightHeight * 3 + rightCols * lightWidth,
    colX: -lightWidth,
    colY: 0,
    rowX: 0,
    rowY: -lightHeight,
    width: lightWidth - whitespace,
    height: lightHeight - whitespace,
  },
]
const textLayout = {
  x: whitespace + lightHeight * 2 + frontCols * lightWidth / 2,
  y: whitespace + lightHeight * 2 + whitespace * 2,
  font: {
    fontSize: 24,
    fontWeight: '100',
    fontFamily: 'Roboto',
  },
}

export class Vis extends Component {
  static propTypes = {
    lights: PropTypes.object,
  }

  // componentDidMount() {
  //   window.addEventListener('resize', this.updateSize)
  //   this.updateSize()
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateSize)
  // }

  getLayout(col) {
    for (let i = 0; i < layout.length; i++) {
      if (col >= layout[i].fromCol && col < layout[i].toCol) {
        return layout[i]
      }
    }
    return null
  }

  getLightPath(col, row) {
    const layout = this.getLayout(col)
    const layoutCol = col - layout.fromCol
    const lightX = layout.startX + layoutCol * layout.colX + row * layout.rowX
    const lightY = layout.startY + layoutCol * layout.colY + row * layout.rowY
    return (
      new Path()
      .moveTo(lightX, lightY)
      .lineTo(lightX + layout.width, lightY)
      .lineTo(lightX + layout.width, lightY + layout.height)
      .lineTo(lightX, lightY + layout.height)
    )
  }

  render() {
    const { lights } = this.props
    return (
      <Surface width={totalWidth} height={totalHeight} style={{ background: 'rgba(255, 255, 255, 0.05)', boxShadow: '0 0 5px rgba(0,0,0,0.5)' }}>
        <Group>
          {lights.mapLights((col, row, r, g, b) =>
            <Shape
              key={`${col},${row}`}
              d={this.getLightPath(col, row)}
              fill={`rgb(${r}, ${g}, ${b})`}
            />
          )}
          <Text fill="#ccc" font={textLayout.font} x={textLayout.x} y={textLayout.y} alignment="middle">Stage</Text>
        </Group>
      </Surface>
    )
  }
}

const ConnectedVis = connect(
    ({ lights }) => ({
      lights,
    })
)(Vis)

export default ConnectedVis
