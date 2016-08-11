import { Component, PropTypes } from 'react'

class Processor extends Component {
  static propTypes = {
    script: PropTypes.object,
    lights: PropTypes.object,
    isPlaying: PropTypes.bool,
    onChangeLights: PropTypes.func,
  }

  componentDidMount() {
    this.updateLoop()
  }

  componentDidUpdate(prevProps) {
    this.updateLoop(prevProps.script)
  }

  updateLoop(prevScript) {
    const { script, isPlaying } = this.props
    if (!isPlaying) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
      return
    }

    // No change?
    if (this.timeoutId && prevScript && prevScript.fps === script.fps) {
      return
    }
    this.lastUpdate = Date.now()
    clearTimeout(this.timeoutId)
    this.scheduleUpdate()
  }

  timeoutId = null
  totalTime = 0
  lastUpdate = null
  scriptState = {}

  scheduleUpdate() {
    const { script } = this.props
    this.timeoutId = setTimeout(this.update, 1000 / script.fps)
  }

  update = () => {
    const { script, onChangeLights } = this.props
    const now = Date.now()
    const delta = (now - this.lastUpdate) / 1000
    this.totalTime += delta
    this.lastUpdate = now

    try {
      const newLights = script.onUpdate(
        this.props.lights,
        this.totalTime,
        this.scriptState
      )
      onChangeLights(newLights)
    } catch (error) {
      // Handle?
      console.log(error)
    }
    this.scheduleUpdate()
  }

  reset() {
    this.scriptState = {}
    this.totalTime = 0
  }

  render() {
    return null
  }
}


export default Processor
