import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Team } from './game'
import pickRandom from 'pick-random'
import words from '../words.json'
import { createNotification } from './notification'
import { RootState } from './store'

const MAX_CARDS = 25
const MAX_STARTING_TEAM_CARDS = 9
const MAX_OTHER_TEAM_CARDS = 8
const MAX_ASSASSIN_CARDS = 1

let counter = 0

enum CardType {
    RED,
    BLUE,
    BYSTANDER,
    ASSASSIN,
}

interface Card {
    id: number
    type: CardType
    turned: boolean
    word: string
}

interface State {
    cards: Card[]
}

const initialState: State = {
    cards: [],
}

const revealAllWords = createAsyncThunk<
    Promise<void>,
    undefined,
    { state: RootState }
>('board/revealAllWords', async (_, { dispatch }): Promise<void> => {
    dispatch(turnAllCards())
    dispatch(createNotification('Revealed all words'))
})

const slice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        newBoard(state, { payload }: PayloadAction<Team>) {
            const allWords = pickRandom(words, { count: MAX_CARDS })

            const startingTeamWords = pickRandom(allWords, {
                count: MAX_STARTING_TEAM_CARDS,
            })

            const otherTeamWords = pickRandom(
                allWords.filter((word) => !startingTeamWords.includes(word)),
                {
                    count: MAX_OTHER_TEAM_CARDS,
                }
            )

            const assassinWord = pickRandom(
                allWords.filter(
                    (word) =>
                        !(
                            startingTeamWords.includes(word) ||
                            otherTeamWords.includes(word)
                        )
                ),
                { count: MAX_ASSASSIN_CARDS }
            )

            state.cards = allWords.map((word) => {
                const [startingTeamCardType, otherTeamCardType] =
                    payload === Team.RED
                        ? [CardType.RED, CardType.BLUE]
                        : [CardType.BLUE, CardType.RED]

                let type = CardType.BYSTANDER

                if (startingTeamWords.includes(word)) {
                    type = startingTeamCardType
                } else if (otherTeamWords.includes(word)) {
                    type = otherTeamCardType
                } else if (assassinWord.includes(word)) {
                    type = CardType.ASSASSIN
                }

                return {
                    id: counter++,
                    turned: false,
                    type,
                    word,
                }
            })
        },

        turnCard(state, { payload }: PayloadAction<number>) {
            const card = state.cards.find(({ id }) => id === payload)

            if (card !== undefined) card.turned = true
        },

        turnAllCards(state) {
            state.cards.forEach((card) => {
                card.turned = true
            })
        },
    },
})

export { CardType, revealAllWords }
export const { newBoard, turnCard, turnAllCards } = slice.actions
export default slice.reducer
