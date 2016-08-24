import React, { Component, PropTypes } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import Lights from './lights'

export class Connection extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    lights: PropTypes.object.isRequired,
    room: PropTypes.string.isRequired,
    emitIncomingLights: PropTypes.bool,
  }

  isConnected = false
  socket = null

  componentDidMount() {
    this.reconnect()
  }

  reconnect() {
    if (this.socket) {
      this.socket.off('disconnect', this.onDisconnect)
      this.socket.disconnect()

      this.props.onDisconnect()
      this.socket = null
      this.isConnected = false
    }

    if (this.props.url && this.props.room) {
      this.socket = io.connect(this.props.url)
      this.socket.on('connect', this.onConnect)
      this.socket.on('lights', this.onLights)
    }
  }

  joinRoom() {
    this.socket.emit('join', this.props.room)
  }

  onConnect = () => {
    // Clear buffer while disconnected
    this.socket.sendBuffer = []

    this.joinRoom()
    this.props.onConnect()
    this.isConnected = true
  }

  onDisconnect = () => {
    this.props.onDisconnect()
    this.isConnected = false
  }

  onLights = () => {
    if (this.props.emitIncomingLights) {
      onLights
    }
  }

  componentDidUpdate(oldProps) {
    const { lights, url, room, isConnected } = this.props
    if (lights !== oldProps.lights && isConnected) {
      this.socket.emit('lights', lights.data)
    }
    if (url !== oldProps.url) {
      this.reconnect()
    } else if (room !== oldProps.url) {
      this.joinRoom()
    }
  }

  render() {
    return null
  }
}

const ReduxConnection = connect(
    ({ lights, runtime: { isPlaying }, backend: { host, room } }) => ({
      lights,
      url: host,
      room,
      emitIncomingLights: !isPlaying,
    }),
    dispatch => ({
      onConnect: () => dispatch(backendConnect()),
      onDisconnect: () => dispatch(backendDisconnect()),
      onLights: lights => dispatch(),
    })
)(Connection)

export default ReduxConnection
