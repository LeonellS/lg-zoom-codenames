import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CardType, newBoard } from './board'
import { createNotification } from './notification'
import { RootState } from './store'

enum Team {
    RED,
    BLUE,
}

function getRandomStartingTeam(): Team {
    const teams = [Team.RED, Team.BLUE]

    return teams[Math.floor(Math.random() * teams.length)]
}

interface State {
    startingTeam: Team
}

const initialState: State = {
    startingTeam: getRandomStartingTeam(),
}

const newGame = createAsyncThunk<Promise<void>, boolean, { state: RootState }>(
    'game/newGame',
    async (switchTeam, { dispatch, getState }): Promise<void> => {
        if (switchTeam) dispatch(switchStartingTeam())

        dispatch(newBoard(getState().game.startingTeam))
        dispatch(
            createNotification(
                `Starting team: ${
                    getState().game.startingTeam === Team.RED ? 'Red' : 'Blue'
                }`
            )
        )
    }
)

const newWordList = createAsyncThunk<
    Promise<void>,
    undefined,
    { state: RootState }
>('game/newWordList', async (_, { dispatch, getState }): Promise<void> => {
    dispatch(newBoard(getState().game.startingTeam))
    dispatch(createNotification('Created new word list'))
})

const copyWordList = createAsyncThunk<
    Promise<void>,
    undefined,
    { state: RootState }
>('game/copyWordList', async (_, { dispatch, getState }): Promise<void> => {
    const cards = getState().board.cards

    const assassin = cards
        .filter(({ type }) => type === CardType.ASSASSIN)
        .map(({ word }) => word)
        .join('\n')

    const redTeam = cards
        .filter(({ type }) => type === CardType.RED)
        .map(({ word }) => word)
        .join('\n')

    const blueTeam = cards
        .filter(({ type }) => type === CardType.BLUE)
        .map(({ word }) => word)
        .join('\n')

    const bystander = cards
        .filter(({ type }) => type === CardType.BYSTANDER)
        .map(({ word }) => word)
        .join('\n')

    const list = []

    list.push(
        `Starting Team: ${
            getState().game.startingTeam === Team.RED ? 'Red' : 'Blue'
        }`,
        `Assassin: \n${assassin}`,
        `Red: \n${redTeam}`,
        `Blue: \n${blueTeam}`,
        `Bystander: \n${bystander}`
    )

    navigator.clipboard
        .writeText(list.join('\n\n'))
        .then(() => {
            dispatch(createNotification('Copied word list'))
        })
        .catch(() => {
            dispatch(createNotification('Error copying word list'))
        })
})

const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        switchStartingTeam(state) {
            state.startingTeam =
                state.startingTeam === Team.RED ? Team.BLUE : Team.RED
        },
    },
})

export { Team, newGame, newWordList, copyWordList }
export const { switchStartingTeam } = slice.actions
export default slice.reducer
