import React, { ReactElement, useEffect, useState } from 'react'

const SpymasterApp = (): ReactElement => {
    const [state, setState] = useState('connection uninitialised')

    useEffect(() => {
        const ws = new WebSocket(
            'ws://127.0.0.1:80/screen-share-codenames/spymaster/ws'
        )

        ws.addEventListener('open', () => {
            setState('connection opened')
        })

        ws.addEventListener('close', () => {
            setState('connection closed')
        })
    }, [])

    return <h1>Spymaster App: {state}</h1>
}

export default SpymasterApp
