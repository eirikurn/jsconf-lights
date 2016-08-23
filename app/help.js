import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import HelpIcon from 'react-icons/lib/md/help'
import CloseIcon from 'react-icons/lib/md/close'
import Modal from './modal'
import readme from '!html!markdown!./README.md'
import styles from './help.css'

export class Help extends Component {
  state = {
    isVisible: false,
  }

  toggleHelp = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    })
  }

  render() {
    const { isVisible } = this.state

    return (
      <div>
        <button className={styles.helpButton} onClick={this.toggleHelp}>
          {isVisible ? <CloseIcon /> : <HelpIcon />}
        </button>
        <Modal isVisible={isVisible} large onClose={this.toggleHelp}>
          <div className={styles.helpText} dangerouslySetInnerHTML={{ __html: readme }} />
        </Modal>
      </div>
    )
  }
}

export default Help
