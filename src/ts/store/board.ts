import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import pickRandom from 'pick-random'
import { difference, first } from 'lodash'
import words from '../words.json'
import { StartingTeam } from './game'

const MAX_CARDS = 25
const MAX_STARTING_TEAM_CARDS = 9
const MAX_OTHER_TEAM_CARDS = 8
const MAX_ASSASSIN_CARDS = 1

export enum CardType {
    RED,
    BLUE,
    ASSASSIN,
    BYSTANDER,
}

interface Card {
    type: CardType
    turned: boolean
    word: string
}

interface BoardState {
    cards: Card[]
}

const initialState: BoardState = {
    cards: [],
}

const slice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        newBoard(state, action: PayloadAction<StartingTeam>) {
            const allWords = pickRandom(words, { count: MAX_CARDS })

            const startingTeamWords = pickRandom(allWords, {
                count: MAX_STARTING_TEAM_CARDS,
            })

            const otherTeamWords = pickRandom(
                difference(allWords, startingTeamWords),
                { count: MAX_OTHER_TEAM_CARDS }
            )

            const assassinWord = first(
                pickRandom(
                    difference(allWords, startingTeamWords, otherTeamWords),
                    { count: MAX_ASSASSIN_CARDS }
                )
            )

            const cards = allWords.map((word) => {
                let type = CardType.BYSTANDER

                if (startingTeamWords.includes(word))
                    type =
                        action.payload === StartingTeam.RED
                            ? CardType.RED
                            : CardType.BLUE
                else if (otherTeamWords.includes(word))
                    type =
                        action.payload === StartingTeam.RED
                            ? CardType.BLUE
                            : CardType.RED
                else if (word === assassinWord) type = CardType.ASSASSIN

                return {
                    type,
                    turned: false,
                    word,
                }
            })

            state.cards = cards
        },

        turnCard(state, action: PayloadAction<number>) {
            const card = state.cards[action.payload]

            if (card) card.turned = true
        },

        turnAllCards(state) {
            state.cards.forEach((card) => {
                card.turned = true
            })
        },
    },
})

export const { newBoard, turnCard, turnAllCards } = slice.actions
export default slice.reducer
