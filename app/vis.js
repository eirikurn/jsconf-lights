import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  Surface,
  Group,
  Shape,
  Path,
} from 'react-art'
import {
  leftCols,
  frontCols,
  rightCols,
} from './config'

const lightHeight = 20
const lightWidth = 10
const totalWidth = lightHeight * 4 + frontCols * lightWidth
const totalHeight = lightHeight * 2 + Math.max(leftCols, rightCols) * lightWidth
const layout = [
  {
    fromCol: 0,
    toCol: leftCols,
    startX: 0,
    startY: lightHeight * 2 + (leftCols - 1) * lightWidth,
    colX: 0,
    colY: -lightWidth,
    rowX: lightHeight,
    rowY: 0,
    width: lightHeight,
    height: lightWidth,
  },
  {
    fromCol: leftCols,
    toCol: leftCols + frontCols,
    startX: lightHeight * 2,
    startY: 0,
    colX: lightWidth,
    colY: 0,
    rowX: 0,
    rowY: lightHeight,
    width: lightWidth,
    height: lightHeight,
  },
  {
    fromCol: leftCols + frontCols,
    toCol: leftCols + frontCols + rightCols,
    startX: lightHeight * 3 + frontCols * lightWidth,
    startY: lightHeight * 2,
    colX: 0,
    colY: lightWidth,
    rowX: -lightHeight,
    rowY: 0,
    width: lightHeight,
    height: lightWidth,
  },
]

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
      <Surface width={totalWidth} height={totalHeight}>
        <Group>
          {lights.mapLights((col, row, r, g, b) =>
            <Shape
              key={`${col},${row}`}
              d={this.getLightPath(col, row)}
              fill={`rgb(${r}, ${g}, ${b})`}
            />
          )}
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
