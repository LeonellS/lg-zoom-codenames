import React from 'react'
import { useAppSelector } from '../hooks'
import NotificationItem from './NotificationItem'

export default function () {
    const notifications = useAppSelector(
        (state) => state.notification.notifications
    )

    return (
        <div className="absolute z-50 w-60 bottom-0 right-0 mb-4 mr-4">
            <div className="flex flex-col space-y-2">
                {notifications
                    .map(({ id, text }) => (
                        <NotificationItem key={id} id={id} text={text} />
                    ))
                    .reverse()}
            </div>
        </div>
    )
}
