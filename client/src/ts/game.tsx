import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import GameApp from './components/GameApp'
import store from './store/store'

render(
    <Provider store={store}>
        <GameApp />
    </Provider>,
    document.getElementById('app')
)
