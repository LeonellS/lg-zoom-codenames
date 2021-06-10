import reducer, {
    CardType,
    newBoard,
    turnAllCards,
    turnCard,
} from '../../store/board'
import { StartingTeam } from '../../store/game'

describe('store/board', () => {
    describe('actions', () => {
        it('creates an action to create a new board', () => {
            const result = newBoard(StartingTeam.RED)

            const expected = {
                type: newBoard.type,
                payload: StartingTeam.RED,
            }

            expect(result).toEqual(expected)
        })

        it('creates an action to turn a card', () => {
            const result = turnCard(0)

            const expected = {
                type: turnCard.type,
                payload: 0,
            }

            expect(result).toEqual(expected)
        })

        it('creates an action to turn all cards', () => {
            const result = turnAllCards()

            const expected = {
                type: turnAllCards.type,
            }

            expect(result).toEqual(expected)
        })
    })

    describe('reducers', () => {
        describe('refreshBoard', () => {
            const result = reducer(
                {
                    cards: [
                        {
                            type: CardType.BYSTANDER,
                            turned: false,
                            word: 'hello',
                        },
                    ],
                },
                newBoard(StartingTeam.RED)
            )

            it('generates new cards', () => {
                const expected = {
                    cards: [],
                }

                expect(result).not.toEqual(expected)
            })

            it('generates 25 cards', () => {
                const expected = 25

                expect(result.cards.length).toBe(expected)
            })

            it('generates 9 cards for the starting team', () => {
                const expected = 9

                expect(
                    result.cards.filter(({ type }) => type === CardType.RED)
                        .length
                ).toBe(expected)
            })

            it('generates 8 cards for the other team', () => {
                const expected = 8

                expect(
                    result.cards.filter(({ type }) => type === CardType.BLUE)
                        .length
                ).toBe(expected)
            })

            it('generates 1 card as the assassin card', () => {
                const expected = 1

                expect(
                    result.cards.filter(
                        ({ type }) => type === CardType.ASSASSIN
                    ).length
                ).toBe(expected)
            })
        })

        it('handles turning a card', () => {
            const result = reducer(
                {
                    cards: [
                        {
                            type: CardType.RED,
                            turned: false,
                            word: 'apple',
                        },
                    ],
                },
                turnCard(0)
            )

            const expected = {
                cards: [
                    {
                        type: CardType.RED,
                        turned: true,
                        word: 'apple',
                    },
                ],
            }

            expect(result).toEqual(expected)
        })

        it('handles turning all cards', () => {
            const result = reducer(
                {
                    cards: [
                        {
                            type: CardType.RED,
                            turned: false,
                            word: 'apple',
                        },
                        {
                            type: CardType.BYSTANDER,
                            turned: false,
                            word: 'bee',
                        },
                    ],
                },
                turnAllCards()
            )

            const expected = {
                cards: [
                    {
                        type: CardType.RED,
                        turned: true,
                        word: 'apple',
                    },
                    {
                        type: CardType.BYSTANDER,
                        turned: true,
                        word: 'bee',
                    },
                ],
            }

            expect(result).toEqual(expected)
        })
    })
})
