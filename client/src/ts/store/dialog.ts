import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum DialogType {
    NewGame,
    NewWordList,
    RevealAllWord,
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
        showDialog(state, { payload: type }: PayloadAction<DialogType>) {
            state.type = type
        },

        hideDialog(state) {
            state.type = null
        },
    },
})

export { DialogType }
export const { showDialog, hideDialog } = slice.actions
export default slice.reducer
