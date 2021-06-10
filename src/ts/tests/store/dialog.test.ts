import reducer, { DialogType, hideDialog, showDialog } from '../../store/dialog'

describe('store/dialog', () => {
    describe('actions', () => {
        it('creates an action to show a dialog type', () => {
            const result = showDialog(DialogType.EXIT)

            const expected = {
                type: showDialog.type,
                payload: DialogType.EXIT,
            }

            expect(result).toEqual(expected)
        })

        it('creates an action to hide the dialog', () => {
            const result = hideDialog()

            const expected = {
                type: hideDialog.type,
            }

            expect(result).toEqual(expected)
        })
    })

    describe('reducers', () => {
        it('handles show dialog', () => {
            const result = reducer(
                {
                    type: null,
                },
                showDialog(DialogType.EXIT)
            )

            const expected = {
                type: DialogType.EXIT,
            }

            expect(result).toEqual(expected)
        })

        it('handles hide dialog', () => {
            const result = reducer(
                {
                    type: DialogType.EXIT,
                },
                hideDialog()
            )

            const expected = {
                type: null,
            }

            expect(result).toEqual(expected)
        })
    })
})
