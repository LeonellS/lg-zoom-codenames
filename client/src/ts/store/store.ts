import { configureStore, Dispatch } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const reducer = {}

const store = configureStore({ reducer })

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { RootState, AppDispatch, useAppDispatch, useAppSelector }
export default store
