import { stringifyAction } from '../action'

test('stringify action with payload', () => {
    const result = stringifyAction('join_game', { code: 'ABCD' })

    expect(result).toBe(
        '{"action":"join_game","payload":"{\\"code\\":\\"ABCD\\"}"}'
    )
})
