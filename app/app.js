import React, { Component } from 'react'
// import Connection from './connection'
import Lights from './lights'
import Vis from './vis'
import Editor from './editor'
import Compiler from './compiler'
import Processor from './processor'
import styles from './app.css'
import defaultCode from '!raw!./examples/rotation' // eslint-disable-line

// const connection = new Connection('http://localhost:8081')

class App extends Component {
  state = {
    lights: new Lights(),
    isPlaying: false,
    code: defaultCode,
    script: null,
  }

  onChangeCode = code => {
    this.setState({ code })
  }

  onCompile = script => {
    this.setState({ script })
  }

  onChangeLights = lights => {
    this.setState({ lights })
  }

  onClickReset = () => {
    const { processor } = this.refs
    processor.reset()
  }

  onClickPlayPause = () => {
    const { isPlaying } = this.state
    this.setState({ isPlaying: !isPlaying })
  }

  render() {
    const { lights, code, script, isPlaying } = this.state
    return (
      <div className={styles.container}>
        <Editor value={code} onChange={this.onChangeCode} />
        <Compiler
          code={code}
          onCompile={this.onCompile}
        />
        <Processor
          ref="processor"
          isPlaying={isPlaying}
          script={script}
          lights={lights}
          onChangeLights={this.onChangeLights}
        />
        <div className={styles.visContainer}>
          <Vis lights={lights} />
          <div className={styles.visControls}>
            <button onClick={this.onClickReset}>Reset</button>
            <button onClick={this.onClickPlayPause}>Play/Pause</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
