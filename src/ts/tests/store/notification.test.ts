import reducer, {
    createNotification,
    removeNotification,
} from '../../store/notification'

describe('store/notification', () => {
    describe('actions', () => {
        it('creates an action to create a notification', () => {
            const result = createNotification('This is a notification')

            const expected = {
                type: createNotification.type,
                payload: 'This is a notification',
            }

            expect(result).toEqual(expected)
        })

        it('creates an action to remove a notification', () => {
            const result = removeNotification(0)

            const expected = {
                type: removeNotification.type,
                payload: 0,
            }

            expect(result).toEqual(expected)
        })
    })

    describe('reducers', () => {
        it('handles creating a new notification', () => {
            const result = reducer(
                {
                    notifications: [],
                },
                createNotification('This is a notification')
            )

            const expected = {
                notifications: [
                    {
                        id: 0,
                        text: 'This is a notification',
                    },
                ],
            }

            expect(result).toEqual(expected)
        })

        it('handles removing a notification', () => {
            const result = reducer(
                {
                    notifications: [
                        {
                            id: 0,
                            text: 'This is a notification',
                        },
                    ],
                },
                removeNotification(0)
            )

            const expected = {
                notifications: [],
            }

            expect(result).toEqual(expected)
        })
    })
})
