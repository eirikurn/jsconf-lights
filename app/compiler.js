import { Component, PropTypes } from 'react'
import Context from 'context-eval'
import { connect } from 'react-redux'
import Color from 'color'
import Lights from './lights'
import { newScript, syntaxErrors } from './actions'
import * as config from './config'

export class Compiler extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    existingError: PropTypes.object,
    onCompile: PropTypes.func.isRequired,
    onError: PropTypes.func,
  }

  componentDidMount() {
    this.evalCode()
  }

  componentDidUpdate(prevProps) {
    this.evalCode(prevProps.code)
  }

  onRegister = (onUpdate, options) => {
    const script = {
      fps: 40,
      ...options,
      onUpdate,
    }
    this.props.onCompile(script)
  }

  onError = (error) => {
    const { onError } = this.props
    console.log(error)
    if (onError) onError(error)
  }

  evalContext = null

  evalCode(previousCode) {
    const { code, existingError } = this.props
    if (code === previousCode || existingError) {
      return
    }

    if (this.evalContext) {
      this.evalContext.destroy()
    }

    this.evalContext = new Context(this.createSandbox())

    const preparedCode = this.prepareCode(code)
    try {
      this.evalContext.evaluate(preparedCode)
    } catch (error) {
      this.onError(error)
    }
  }

  prepareCode(code) {
    // Strict mode fixes strange evaluation issues in Chrome.
    if (code.indexOf('use strict') !== 0) {
      return `'use strict'\n${code}`
    }
    return code
  }

  createSandbox() {
    return {
      config,
      Lights,
      Color,
      register: this.onRegister,
    }
  }

  render() {
    return null
  }
}

const ConnectedCompiler = connect(
    ({ runtime: { code, error } }) => ({
      code,
      existingError: error,
    }),
    dispatch => ({
      onCompile: script => dispatch(newScript(script)),
      onError: errors => dispatch(syntaxErrors([errors])),
    })
)(Compiler)

export default ConnectedCompiler
