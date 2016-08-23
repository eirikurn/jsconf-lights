import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './modal.css'

export class Modal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    large: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown, false)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown, false)
  }

  onKeyDown = event => {
    const { isVisible, onClose } = this.props
    if (onClose && isVisible && event.keyCode === 27) {
      onClose()
    }
  }

  render() {
    const { isVisible, onClose, large, children } = this.props

    return (
      <div className={classnames(styles.modal, { [styles.isVisible]: isVisible, [styles.large]: large })}>
        <div className={styles.modalInner}>
          {children}
        </div>
      </div>
    )
  }
}

export default Modal
