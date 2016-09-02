import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { togglePlay } from './actions'
import classnames from 'classnames'
import PlayIcon from 'react-icons/lib/md/play-arrow'
import PauseIcon from 'react-icons/lib/md/pause'
import ReplayIcon from 'react-icons/lib/md/replay'
import RecordIcon from 'react-icons/lib/md/fiber-manual-record'
import BackendModal from './backend-modal'
import styles from './toolbar.css'

function formatError(error) {
  return `Error: ${error.message}`
}

export class Toolbar extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool,
    isDirty: PropTypes.bool,
    isConnected: PropTypes.bool,
    error: PropTypes.object,
    onTogglePlay: PropTypes.func,
    onReset: PropTypes.func,
  }

  state = {
    modalVisible: false,
  }

  toggleBackendModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
  }

  render() {
    const { isPlaying, isDirty, isConnected, error, onTogglePlay, onReset } = this.props
    const { modalVisible } = this.state

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
        {/*
        <button className={classnames(styles.button, styles.right)} onClick={this.toggleBackendModal} title="Backend connection">
          <RecordIcon fill={isConnected ? '#006600' : 'rgba(255, 0, 0, 0.36)'} />
        </button>
        <BackendModal isVisible={modalVisible} onClose={this.toggleBackendModal} />
        */}
      </div>
    )
  }
}

const ConnectedToolbar = connect(
    ({ runtime: { isPlaying, isDirty, error }, backend: { isConnected } }) => ({
      isPlaying,
      isDirty,
      error,
      isConnected,
    }),
    dispatch => ({
      onTogglePlay: () => dispatch(togglePlay()),
    })
)(Toolbar)

export default ConnectedToolbar
