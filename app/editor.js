import React, { Component, PropTypes } from 'react'
import AceEditor from 'react-ace'
import debounce from 'lodash/debounce'
import 'brace'
import 'brace/mode/javascript'
import 'brace/theme/vibrant_ink'
import 'brace/ext/searchbox'

class Editor extends Component {
  static propTypes = {
    value: PropTypes.string,
    onDirty: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  componentDidMount() {
    const { editor } = this.refs.ace
    editor.getSession().$worker.send("changeOptions", [{ asi: true }]);
  }

  debouncedChange = debounce(value => {
    const { onChange, onError } = this.props
    const { editor } = this.refs.ace
    const errors = editor
      .getSession()
      .getAnnotations()
      .filter(annotation => annotation.type === 'error')
      .map(annotation => ({ ...annotation }))
    
    if (errors.length && onError) {
      onError(...errors)
    } else if (errors.length === 0 && onChange) {
      onChange(value)
    }
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
            value={value}
            onChange={this.onChange}
            editorProps={{ $blockScrolling: true }}
        />
    )
  }
}

export default Editor
