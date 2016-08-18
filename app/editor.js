import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { newCode, dirtyCode, syntaxErrors } from './actions'
import AceEditor from 'react-ace'
import debounce from 'lodash/debounce'
import 'brace'
import 'brace/mode/javascript'
import 'brace/theme/vibrant_ink'
import 'brace/ext/searchbox'

export class Editor extends Component {
  static propTypes = {
    value: PropTypes.string,
    onDirty: PropTypes.func,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
    }
  }

  componentDidMount() {
    const { editor } = this.refs.ace
    editor.getSession().$worker.call('changeOptions', [{
      asi: true,
      globals: {
        config: false,
        Lights: false,
        register: false,
      },
      strict: 'implied',
    }])
  }

  debouncedChange = debounce(value => {
    const { onChange, onErrors } = this.props
    const { editor } = this.refs.ace
    const errors = editor
      .getSession()
      .getAnnotations()
      .filter(annotation => annotation.type === 'error')
      .map(annotation => {
        const error = new Error(annotation.text)
        error.name = 'SyntaxError'
        error.row = annotation.row
        error.column = annotation.column
        return error
      })

    onChange(value, errors)
  }, 1000)

  onChange = value => {
    const { onDirty } = this.props
    this.state.value = value
    if (onDirty) onDirty()
    this.debouncedChange(value)
  }

  render() {
    const { onChange, onDirty } = this.props
    const { value } = this.state
    return (
      <AceEditor
          ref="ace"
          mode="javascript"
          theme="vibrant_ink"
          height="100%"
          width="100%"
          value={value}
          onChange={this.onChange}
          editorProps={{ $blockScrolling: true }}
      />
    )
  }
}

const ConnectedEditor = connect(
    ({ runtime: { code } }) => ({
      value: code,
    }),
    dispatch => ({
      onChange: (code, errors) => dispatch(newCode(code, errors)),
      onDirty: () => dispatch(dirtyCode()),
    })
)(Editor)

export default ConnectedEditor
