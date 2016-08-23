/*
 * action types
 */

export const NEW_CODE = 'NEW_CODE'
export const DIRTY_CODE = 'DIRTY_CODE'
export const SYNTAX_ERRORS = 'SYNTAX_ERRORS'
export const NEW_SCRIPT = 'NEW_SCRIPT'
export const RUNTIME_ERRORS = 'RUNTIME_ERRORS'
export const TOGGLE_PLAY = 'TOGGLE_PLAY'
export const NEW_LIGHTS = 'NEW_LIGHTS'
export const BACKEND_CHANGE = 'BACKEND_CHANGE'
export const BACKEND_CONNECT = 'BACKEND_CONNECT'
export const BACKEND_DISCONNECT = 'BACKEND_DISCONNECT'

/*
 * action creators
 */

export function newCode(code, errors = []) {
  return { type: NEW_CODE, code, errors }
}

export function dirtyCode() {
  return { type: DIRTY_CODE }
}

export function syntaxErrors(errors) {
  return { type: SYNTAX_ERRORS, errors }
}

export function newScript(script) {
  return { type: NEW_SCRIPT, script }
}

export function runtimeErrors(errors) {
  return { type: RUNTIME_ERRORS, errors }
}

export function togglePlay() {
  return { type: TOGGLE_PLAY }
}

export function newLights(lights) {
  return { type: NEW_LIGHTS, lights }
}

export function backendChange(host, room) {
  return { type: BACKEND_CHANGE, host, room }
}

export function backendConnect() {
  return { type: BACKEND_CONNECT }
}

export function backendDisconnect() {
  return { type: BACKEND_DISCONNECT }
}
