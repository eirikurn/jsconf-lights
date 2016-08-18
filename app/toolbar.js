import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { togglePlay } from './actions'
import classnames from 'classnames'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import ReplayIcon from 'react-icons/lib/md/replay'
import styles from './toolbar.css'

function formatError(error) {
  return `Syntax error: ${error.message}`
}

export class Toolbar extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool,
    isDirty: PropTypes.bool,
    error: PropTypes.object,
    onTogglePlay: PropTypes.func,
    onReset: PropTypes.func,
  }

  render() {
    const { isPlaying, isDirty, error, onTogglePlay, onReset } = this.props

    let message = 'Ready'
    if (isPlaying) {
      message = 'Running'
    }
    if (error) {
      message = formatError(error)
    }
    const toolbarClasses = classnames(
      styles.toolbar,
      {
        [styles.error]: !!error,
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
    ({ runtime: { isPlaying, isDirty, error } }) => ({
      isPlaying,
      isDirty,
      error,
    }),
    dispatch => ({
      onTogglePlay: () => dispatch(togglePlay()),
    })
)(Toolbar)

export default ConnectedToolbar
