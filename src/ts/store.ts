import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import boardReducer from './store/board'
import gameReducer from './store/game'
import dialogReducer from './store/dialog'
import notificationReducer from './store/notification'
import thunk from 'redux-thunk'

const middleware = [...getDefaultMiddleware(), thunk]

const store = configureStore({
    reducer: {
        board: boardReducer,
        game: gameReducer,
        dialog: dialogReducer,
        notification: notificationReducer,
    },
    middleware,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
