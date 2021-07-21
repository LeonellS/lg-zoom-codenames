// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from './store'

// interface CounterState {
//     counter: number
//     action: string
// }

// const initialState: CounterState = {
//     counter: 0,
//     action: 'doing nothing',
// }

// const testThunk = createAsyncThunk<
//     Promise<void>,
//     undefined,
//     { state: RootState }
// >('counter/testThunk', async (_, { dispatch, getState }): Promise<void> => {
//     console.log('test thunk')
//     dispatch(counterNow())
//     dispatch(currentAction(`before counter: ${getState().counter.counter}`))
//     dispatch(incrementCounter())
//     dispatch(currentAction(`after counter: ${getState().counter.counter}`))
//     dispatch(counterNow())
// })

// const slice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         incrementCounter: (state) => {
//             console.log('increment')
//             state.counter++
//         },
//         counterNow: (state) => {
//             console.log(`counter now: ${state.counter}`)
//         },
//         currentAction: (state, { payload }: PayloadAction<string>) => {
//             console.log(`received: ${payload}`)
//             state.action = payload
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(testThunk.fulfilled, () => {
//             console.log('done')
//         })
//     },
// })

// export const { incrementCounter, counterNow, currentAction } = slice.actions
// export { testThunk }
// export default slice.reducer
