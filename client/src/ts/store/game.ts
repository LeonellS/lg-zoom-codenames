import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewGamePayload } from '../action/payload'
import { Card } from '../game/card'
import { StartingTeam } from '../game/team'
import { createNotification } from './notification'
import { RootState } from './store'

interface State {
    code: string
    cards: Card[]
}

const initialState: State = {
    code: '',
    cards: [],
}

const newGame = createAsyncThunk<
    Promise<void>,
    NewGamePayload,
    { state: RootState }
>(
    'game/newGame',
    async ({ startingTeam, cards }, { dispatch }): Promise<void> => {
        dispatch(updateCards(cards))
        dispatch(
            createNotification(
                `Starting team: ${
                    startingTeam === StartingTeam.Red ? 'Red' : 'Blue'
                }`
            )
        )
    }
)

const newWordList = createAsyncThunk<
    Promise<void>,
    Card[],
    { state: RootState }
>('game/newWordList', async (cards, { dispatch }): Promise<void> => {
    dispatch(updateCards(cards))
    dispatch(createNotification('Created new word list'))
})

const revealAllWords = createAsyncThunk<
    Promise<void>,
    undefined,
    { state: RootState }
>('game/revealAllWords', async (_, { dispatch }): Promise<void> => {
    dispatch(turnAllCards())
    dispatch(createNotification('Revealed all words'))
})

const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setCode(state, { payload: code }: PayloadAction<string>) {
            state.code = code
        },

        updateCards(state, { payload: cards }: PayloadAction<Card[]>) {
            state.cards = cards
        },

        turnCard(state, { payload: uuid }: PayloadAction<string>) {
            const card = state.cards.find((card) => card.uuid === uuid)

            if (card !== undefined) card.turned = true
        },

        turnAllCards(state) {
            state.cards.forEach((card) => {
                card.turned = true
            })
        },
    },
})

export { newGame, newWordList, revealAllWords }
export const { updateCards, turnCard, turnAllCards, setCode } = slice.actions
export default slice.reducer
