import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let counter = 0
interface Notification {
    id: number
    text: string
}

interface State {
    notifications: Notification[]
}

const initialState: State = {
    notifications: [],
}

const slice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, { payload }: PayloadAction<string>) {
            state.notifications.push({
                id: counter++,
                text: payload,
            })
        },
        removeNotification(state, { payload }: PayloadAction<number>) {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== payload
            )
        },
    },
})

export const { createNotification, removeNotification } = slice.actions
export default slice.reducer
