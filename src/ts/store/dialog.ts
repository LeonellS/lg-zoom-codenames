import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum DialogType {
    NEW_GAME,
    NEW_WORD_LIST,
    REVEAL_ALL_WORDS,
    EXIT,
}

interface DialogState {
    type: DialogType | null
}

const initialState: DialogState = {
    type: null,
}

const slice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        showDialog(state, action: PayloadAction<DialogType>) {
            state.type = action.payload
        },

        hideDialog(state) {
            state.type = null
        },
    },
})

export const { showDialog, hideDialog } = slice.actions
export default slice.reducer
