import { combineReducers } from 'redux'
import {
    NEW_CODE, DIRTY_CODE, SYNTAX_ERRORS, NEW_SCRIPT, RUNTIME_ERRORS, TOGGLE_PLAY,
    NEW_LIGHTS,
    BACKEND_CONNECT, BACKEND_DISCONNECT, BACKEND_CHANGE
} from './actions'
import { REHYDRATE } from 'redux-persist/constants'
import Lights from './lights'
import defaultCode from '!raw!./examples/hue' // eslint-disable-line
import { backendHost } from './shared/config'

const initialBackendState = {
  host: backendHost,
  room: '',
  isConnected: false,
}
function backend(state = initialBackendState, action) {
  switch (action.type) {
    case BACKEND_CONNECT:
      return {
        ...state,
        isConnected: true,
      }
    case BACKEND_DISCONNECT:
      return {
        ...state,
        isConnected: false,
      }
    case BACKEND_CHANGE:
      return {
        ...state,
        host: action.host,
        room: action.room,
      }
    case REHYDRATE: {
      const incoming = action.payload.backend
      if (incoming) {
        return {
          ...state,
          host: incoming.host,
          room: incoming.room,
        }
      }
      return state
    }
    default:
      return state
  }
}

function lights(state = new Lights(), action) {
  switch (action.type) {
    case NEW_LIGHTS:
      return action.lights
  }
  return state
}

const initialRuntimeState = {
  code: defaultCode,
  script: null,
  error: null,
  wasPlaying: false,
  isPlaying: false,
  isDirty: false,
}
function runtime(state = initialRuntimeState, action) {
  switch (action.type) {
    case NEW_CODE: {
      const error = action.errors && action.errors[0]
      return {
        ...state,
        error: error || null,
        code: action.code,
        isDirty: false,
        isActuallyPlaying: state.isActuallyPlaying && !error,
      }
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
        error: action.errors[0],
        isActuallyPlaying: false,
      }

    case NEW_SCRIPT:
      return {
        ...state,
        script: action.script,
        error: null,
        isActuallyPlaying: state.isPlaying,
      }

    case RUNTIME_ERRORS:
      return {
        ...state,
        error: action.errors[0],
        isActuallyPlaying: false,
      }

    case TOGGLE_PLAY:
      if (state.isPlaying) {
        return {
          ...state,
          isActuallyPlaying: false,
          isPlaying: false,
        }
      }
      if (state.script && !state.error) {
        return {
          ...state,
          isActuallyPlaying: true,
          isPlaying: true,
        }
      }
      return state

    case REHYDRATE: {
      const incoming = action.payload.runtime
      if (incoming) {
        return {
          ...state,
          code: incoming.code,
          error: incoming.error,
        }
      }
      return state
    }

    default:
      return state
  }
}

const appReducers = combineReducers({
  runtime,
  backend,
  lights,
})

export default appReducers
