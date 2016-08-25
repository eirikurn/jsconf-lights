import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { NEW_LIGHTS, DIRTY_CODE } from './actions'
import createLogger from 'redux-logger'
import reducers from './reducers'
import App from './app'

const logger = createLogger({
  collapsed: true,
  predicate: (getState, action) => action.type !== NEW_LIGHTS && action.type !== DIRTY_CODE,
})

const store = createStore(reducers, applyMiddleware(logger), autoRehydrate())
persistStore(store, { whitelist: ['runtime', 'backend'] })

// Render the app.
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
