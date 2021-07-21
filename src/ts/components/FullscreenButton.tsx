import React, { ReactElement } from 'react'
import { FullScreenHandle } from 'react-full-screen'
import { createNotification } from '../store/notification'
import { useAppDispatch } from '../store/store'

interface Props {
    handle: FullScreenHandle
}

function getIcon(active: boolean): ReactElement {
    if (active)
        return (
            <svg
                className="button--icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M5.25 1a.75.75 0 01.75.75v2.5A1.75 1.75 0 014.25 6h-2.5a.75.75 0 010-1.5h2.5a.25.25 0 00.25-.25v-2.5A.75.75 0 015.25 1zm5.5 0a.75.75 0 01.75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 0110 4.25v-2.5a.75.75 0 01.75-.75zM1 10.75a.75.75 0 01.75-.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a.75.75 0 01-1.5 0v-2.5a.25.25 0 00-.25-.25h-2.5a.75.75 0 01-.75-.75zm9 1c0-.966.784-1.75 1.75-1.75h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0v-2.5z"
                />
            </svg>
        )

    return (
        <svg
            className="button--icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M2.75 2.5a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0v-2.5C1 1.784 1.784 1 2.75 1h2.5a.75.75 0 010 1.5h-2.5zM10 1.75a.75.75 0 01.75-.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a.75.75 0 01-1.5 0v-2.5a.25.25 0 00-.25-.25h-2.5a.75.75 0 01-.75-.75zM1.75 10a.75.75 0 01.75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 011 13.25v-2.5a.75.75 0 01.75-.75zm12.5 0a.75.75 0 01.75.75v2.5A1.75 1.75 0 0113.25 15h-2.5a.75.75 0 010-1.5h2.5a.25.25 0 00.25-.25v-2.5a.75.75 0 01.75-.75z"
            />
        </svg>
    )
}

const FullScreenButton = ({ handle }: Props): ReactElement => {
    const dispatch = useAppDispatch()

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
        <button
            className="window__action button button--outline button--small"
            onClick={handleClick}
        >
            {getIcon(handle.active)}
            <span>{handle.active ? 'Exit' : 'Enter'} Fullscreen</span>
        </button>
    )
}

export default FullScreenButton
