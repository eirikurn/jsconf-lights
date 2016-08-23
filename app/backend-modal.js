import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { backendChange } from './actions'
import Modal from './modal'
import styles from './backend-modal.css'

export class BackendModal extends Component {
  state = {
    host: this.props.host,
    room: this.props.room,
  }

  onChangeHost = (event) => {
    this.setState({ host: event.target.value })
  }

  onChangeRoom = (event) => {
    this.setState({ room: event.target.value })
  }

  onSave = event => {
    const { onSave, onClose } = this.props
    const { host, room } = this.state
    onSave(host, room)
    onClose()

    event.preventDefault()
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.isVisible && newProps.isVisible) {
      this.setState({
        host: newProps.host,
        room: newProps.room,
      })
    }
  }

  componentDidUpdate(oldProps) {
    if (this.props.isVisible && !oldProps.isVisible) {
      this.refs.room.focus()
    }
  }

  render() {
    const { isVisible, onClose } = this.props
    const { host, room } = this.state

    return (
      <Modal isVisible={isVisible} onClose={onClose}>
        <form onSubmit={this.onSave}>
          <p>
            <input ref="room" type="text" value={room} onChange={this.onChangeRoom} />
          </p>
          <p>
          <input type="text" value={host} onChange={this.onChangeHost} />
          </p>
          <p>
          <button type="submit">Save</button>
          </p>
        </form>
      </Modal>
    )
  }
}

const ReduxBackendModal = connect(
  ({ backend: { host, room } }) => ({
    host,
    room,
  }),
  dispatch => ({
    onSave: (host, room) => dispatch(backendChange(host, room)),
  })
)(BackendModal)

export default ReduxBackendModal
