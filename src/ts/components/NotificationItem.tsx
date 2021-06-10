import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { removeNotification } from '../store/notification'

const NOTIFICATION_FADING_OUT_TIMEOUT = 4000
const NOTIFICATION_REMOVE_TIMEOUT = 5000

interface NotificationItemProps {
    id: number
    text: string
}

export default function ({ id: itemId, text }: NotificationItemProps) {
    const dispatch = useAppDispatch()

    const [fadingOut, setFadingOut] = useState(false)

    useEffect(() => {
        const fadeOutTimer = setTimeout(
            fadeOut,
            NOTIFICATION_FADING_OUT_TIMEOUT
        )
        const removeTimer = setTimeout(remove, NOTIFICATION_REMOVE_TIMEOUT)

        return () => {
            clearTimeout(fadeOutTimer)
            clearTimeout(removeTimer)
        }
    }, [])

    function remove() {
        dispatch(removeNotification(itemId))
    }

    function fadeOut() {
        setFadingOut(true)
    }

    return (
        <div
            className={`bg-black rounded px-3 py-2 text-xs border border-gray-800 cursor-pointer transition-opacity duration-1000 ${
                fadingOut ? 'opacity-0' : null
            }`}
            onClick={remove}
        >
            {text}
        </div>
    )
}
