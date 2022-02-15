import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import SpymasterApp from './components/SpymasterApp'
import store from './store/store'

render(
    <Provider store={store}>
        <SpymasterApp />
    </Provider>,
    document.getElementById('app')
)
