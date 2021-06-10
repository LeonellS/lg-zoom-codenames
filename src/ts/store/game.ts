import { createSlice } from '@reduxjs/toolkit'
import randomItem from 'random-item'

export enum StartingTeam {
    RED,
    BLUE,
}

interface GameState {
    startingTeam: StartingTeam
}

const initialState: GameState = {
    startingTeam: randomItem([StartingTeam.BLUE, StartingTeam.RED]),
}

const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        switchStartingTeam(state) {
            state.startingTeam =
                state.startingTeam === StartingTeam.BLUE
                    ? StartingTeam.RED
                    : StartingTeam.BLUE
        },
    },
})

export const { switchStartingTeam } = slice.actions
export default slice.reducer
