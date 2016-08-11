import { Component, PropTypes } from 'react'
import Context from 'context-eval'
import Lights from './lights'
import * as config from './config'

class Compiler extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onCompile: PropTypes.func,
  }

  componentDidMount() {
    this.evalCode()
  }

  componentDidUpdate(prevProps) {
    this.evalCode(prevProps.code)
  }

  onRegister = (onUpdate, options) => {
    const script = {
      fps: 50,
      ...options,
      onUpdate,
    }
    this.props.onCompile(script)
  }

  onError = (error) => {
    console.log('outch')
    console.log(error)
  }

  evalContext = null

  evalCode(previousCode) {
    const { code } = this.props
    if (code === previousCode) {
      return
    }

    if (this.evalContext) {
      this.evalContext.destroy()
    }
    this.evalContext = new Context(this.createSandbox())
    this.evalContext.evaluate(code)
  }

  createSandbox() {
    return {
      config,
      Lights,
      register: this.onRegister,
      onerror: this.onError,
    }
  }

  render() {
    return null
  }
}

export default Compiler
