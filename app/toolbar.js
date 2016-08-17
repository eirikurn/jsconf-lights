import React, { Component } from 'react'
import { connect } from 'react-redux'
import { togglePlay } from './actions'
import classnames from 'classnames'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import ReplayIcon from 'react-icons/lib/md/replay'
import styles from './toolbar.css'

function formatError(error) {
  return `${error.name}: ${error.message}`
}

export class Toolbar extends Component {
  render() {
    const { isPlaying, isDirty, syntaxErrors, runtimeErrors, onTogglePlay, onReset } = this.props
    
    let message = 'Ready'
    if (isPlaying) {
      message = 'Running'
    }
    if (syntaxErrors.length) {
      message = formatError(syntaxErrors[0])
    }
    const toolbarClasses = classnames(
      styles.toolbar,
      {
        [styles.error]: syntaxErrors.length > 0, 
        [styles.dirty]: isDirty,
      }
    )
    
    return (
      <div className={toolbarClasses}>
        <button className={classnames(styles.button, styles.replay)} onClick={onReset}>
          <ReplayIcon />
        </button>
        <button className={classnames(styles.button, styles.play)} onClick={onTogglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className={styles.status}>
          {message}
        </div>
      </div>
    )
  }
}

const ConnectedToolbar = connect(
    ({ runtime: { isPlaying, isDirty, syntaxErrors, runtimeErrors }}) => ({ isPlaying, syntaxErrors, runtimeErrors}),
    dispatch => ({
      onTogglePlay: () => dispatch(togglePlay())
    })
)(Toolbar)

export default ConnectedToolbar
