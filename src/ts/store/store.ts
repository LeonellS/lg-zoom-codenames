import { configureStore, Dispatch } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import notification from './notification'
import board from './board'
import dialog from './dialog'
import game from './game'

const reducer = { notification, board, dialog, game }

const store = configureStore({ reducer })

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { RootState, AppDispatch, useAppDispatch, useAppSelector }
export default store
