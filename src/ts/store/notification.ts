import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let notificationIdCounter = 0

interface Notification {
    id: number
    text: string
}

interface NotificationState {
    notifications: Notification[]
}

const initialState: NotificationState = {
    notifications: [],
}

const slice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action: PayloadAction<string>) {
            state.notifications.push({
                id: notificationIdCounter++,
                text: action.payload,
            })
        },

        removeNotification(state, action: PayloadAction<number>) {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            )
        },
    },
})

export const { createNotification, removeNotification } = slice.actions
export default slice.reducer
