import React, { ReactElement, useEffect, useState } from 'react'
import { removeNotification } from '../../store/notification'
import { useAppDispatch, useAppSelector } from '../../store/store'

const NOTIFICATION_FADING_OUT_INTERVAL = 5000
const NOTIFICATION_REMOVE_INTERVAL = 6000

interface NotificationProps {
    id: number
    children: string
}

const Notification = ({ id, children }: NotificationProps): ReactElement => {
    const dispatch = useAppDispatch()

    const [fadingOut, setFadingOut] = useState(false)

    useEffect(() => {
        const fadeOutTimer = setTimeout(
            () => setFadingOut(true),
            NOTIFICATION_FADING_OUT_INTERVAL
        )

        const removeTimer = setTimeout(
            () => dispatch(removeNotification(id)),
            NOTIFICATION_REMOVE_INTERVAL
        )

        return () => {
            clearTimeout(fadeOutTimer)
            clearTimeout(removeTimer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className={`notification notification--${
                fadingOut ? 'hide' : 'show'
            }`}
            role="alert"
        >
            {children}
        </div>
    )
}

const Container = (): ReactElement => {
    const notifications = useAppSelector(
        (state) => state.notification.notifications
    )

    return (
        <div className="notification__container">
            {notifications.map(({ id, text }) => (
                <Notification id={id} key={id}>
                    {text}
                </Notification>
            ))}
        </div>
    )
}

export default Container
