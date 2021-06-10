import reducer, { StartingTeam, switchStartingTeam } from '../../store/game'

describe('store/game', () => {
    describe('actions', () => {
        it('creates an action to switch starting team', () => {
            const result = switchStartingTeam()

            const expected = {
                type: switchStartingTeam.type,
            }

            expect(result).toEqual(expected)
        })
    })

    describe('reducers', () => {
        it('handles switching the starting team', () => {
            const result = reducer(
                {
                    startingTeam: StartingTeam.BLUE,
                },
                switchStartingTeam()
            )

            const expected = {
                startingTeam: StartingTeam.RED,
            }

            expect(result).toEqual(expected)
        })
    })
})
