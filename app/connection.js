import React, { Component, PropTypes } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { backendConnect, backendDisconnect, newLights } from './actions'
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

  disconnect() {
    if (this.socket) {
      this.socket.off('disconnect', this.onDisconnect)
      this.socket.close()

      this.props.onDisconnect()
      this.socket = null
      this.isConnected = false
    }
  }

  connect() {
    if (this.props.url && this.props.room) {
      this.socket = io.connect(this.props.url)
      this.socket.on('connect', this.onConnect)
      this.socket.on('lights', this.onLights)
    }
  }

  reconnect() {
    this.disconnect()
    this.connect()
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

  onLights = (lights) => {
    const { onLights } = this.props
    if (this.props.emitIncomingLights) {
      onLights(new Lights(lights))
    }
  }

  componentDidUpdate(oldProps) {
    const { lights, url, room } = this.props
    if (lights !== oldProps.lights && this.isConnected) {
      this.socket.emit('lights', lights.data)
    }

    const wasConfigured = oldProps.url && oldProps.room
    const isConfigured = url && room

    if (wasConfigured && !isConfigured) {
      this.disconnect()
    } else if (!wasConfigured && isConfigured) {
      this.connect()
    } else if (isConfigured && oldProps.url !== url) {
      this.reconnect()
    } else if (isConfigured && oldProps.room !== room && isConnected) {
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
      onLights: lights => dispatch(newLights(lights)),
    })
)(Connection)

export default ReduxConnection
