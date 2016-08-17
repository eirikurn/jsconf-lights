import { combineReducers } from 'redux'
import { NEW_CODE, DIRTY_CODE, SYNTAX_ERRORS, NEW_SCRIPT, RUNTIME_ERRORS, TOGGLE_PLAY, NEW_LIGHTS } from './actions'
import Lights from './lights'
import defaultCode from '!raw!./examples/rotation' // eslint-disable-line

function lights(state = new Lights(), action) {
  switch (action.type) {
    case NEW_LIGHTS:
      return action.lights
  }
  return state
}

const initialRuntimeState = {
  code: defaultCode,
  syntaxErrors: [],
  script: null,
  runtimeErrors: [],
  wasPlaying: false,
  isPlaying: false,
  isDirty: false,
}
function runtime(state = initialRuntimeState, action) {
  switch (action.type) {
    case NEW_CODE:
      return {
        ...state,
        syntaxErrors: [],
        code: action.code,
      }
    
    case DIRTY_CODE:
      if (!state.isDirty) {
        return {
          ...state,
          isDirty: true,
        }
      }
      return state

    case SYNTAX_ERRORS:
      return {
        ...state,
        syntaxErrors: action.errors,
        isPlaying: false,
      }

    case NEW_SCRIPT:
      return {
        ...state,
        script: action.script,
        runtimeErrors: [],
      }

    case RUNTIME_ERRORS:
      return {
        ...state,
        runtimeErrors: state.runtimeErrors.concat(action.errors)
      }

    case TOGGLE_PLAY:
      if (state.wasPlaying) {
        return {
          ...state,
          isPlaying: false,
          wasPlaying: false,
        }
      }
      if (state.script && state.syntaxErrors.length === 0) {
        return {
          ...state,
          isPlaying: true,
          wasPlaying: true
        }
      }
      return state

    default:
      return state
  }
}

const appReducers = combineReducers({
  runtime,
  lights,
})

export default appReducers
