import React, { ReactElement } from 'react'
import { useFullScreenHandle } from 'react-full-screen'
import { createNotification } from '../../store/notification'
import { useAppDispatch } from '../../store/store'

const Fullscreen = (): ReactElement => {
    const dispatch = useAppDispatch()
    const handle = useFullScreenHandle()

    function handleClick(): void {
        if (handle.active) {
            handle.exit().catch(() => {
                dispatch(createNotification('Error exiting fullscreen'))
            })
        } else {
            handle.enter().catch(() => {
                dispatch(createNotification('Error entering fullscreen'))
            })
        }
    }

    return (
        <button className="fullscreen" onClick={handleClick}>
            {handle.active ? 'Exit' : 'Enter'} Fullscreen
        </button>
    )
}

export default Fullscreen
