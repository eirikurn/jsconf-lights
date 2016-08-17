import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import App from './app'

const store = createStore(reducers)

// Render the app.
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
