import React, { PropTypes } from 'react'
import AceEditor from 'react-ace'
import 'brace'
import 'brace/mode/javascript'
import 'brace/theme/vibrant_ink'
import 'brace/ext/searchbox'

const Editor = ({ onChange, value }) => (
  <AceEditor
    mode="javascript"
    theme="vibrant_ink"
    height="100%"
    value={value}
    onChange={onChange}
    editorProps={{ $blockScrolling: true }}
  />
)

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default Editor
