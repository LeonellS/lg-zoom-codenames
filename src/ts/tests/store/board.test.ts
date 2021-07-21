import reducer, { CardType, newBoard } from '../../store/board'
import { Team } from '../../store/game'

test('new board', () => {
    const result = reducer(undefined, newBoard(Team.RED))

    const expectedCards = 25
    const expectedRedCards = 9
    const expectedBlueCards = 8
    const expectedAssassinCards = 1

    expect(result.cards).toHaveLength(expectedCards)

    expect(
        result.cards.filter(({ type }) => type === CardType.RED)
    ).toHaveLength(expectedRedCards)

    expect(
        result.cards.filter(({ type }) => type === CardType.BLUE)
    ).toHaveLength(expectedBlueCards)

    expect(
        result.cards.filter(({ type }) => type === CardType.ASSASSIN)
    ).toHaveLength(expectedAssassinCards)
})
