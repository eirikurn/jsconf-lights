import React, { Component } from 'react'
import Connection from './connection'
import Help from './help'
import Vis from './vis'
import Editor from './editor'
import Compiler from './compiler'
import Processor from './processor'
import Toolbar from './toolbar'
import styles from './app.css'

class App extends Component {
  onClickReset = () => {
    const { processor } = this.refs
    processor.getWrappedInstance().reset()
  }

  render() {
    return (
      <div className={styles.container}>
        <Compiler />
        <Processor ref="processor" />
        <Connection url="http://localhost:8081" channel="eirikurn" />

        <div className={styles.left}>
          <Editor />
        </div>
        <div className={styles.right}>
          <div className={styles.toolbar}>
            <Toolbar onReset={this.onClickReset} />
          </div>
          <div className={styles.vis}>
            <Vis />
          </div>
        </div>
        <Help />
      </div>
    )
  }
}

export default App
