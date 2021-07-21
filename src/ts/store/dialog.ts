import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum DialogType {
    NEW_GAME,
    NEW_WORD_LIST,
    REVEAL_ALL_WORD,
}

interface State {
    type: DialogType | null
}

const initialState: State = {
    type: null,
}

const slice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        showDialog(state, { payload }: PayloadAction<DialogType>) {
            state.type = payload
        },

        hideDialog(state) {
            state.type = null
        },
    },
})

export { DialogType }
export const { showDialog, hideDialog } = slice.actions
export default slice.reducer
