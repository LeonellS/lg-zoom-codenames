import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Action } from '../action'

const GameApp = (): ReactElement => {
    const [state, setState] = useState('connection uninitialised')
    const [messages, setMessages] = useState<string[]>([])
    const ws = useRef<WebSocket | null>(null)

    useEffect(() => {
        ws.current = new WebSocket(
            'ws://127.0.0.1:80/screen-share-codenames/game/ws'
        )

        ws.current.addEventListener('open', () => {
            setState('connection opened')
        })

        ws.current.addEventListener('close', () => {
            setState('connection closed')
        })

        ws.current.addEventListener('message', (e) => {
            setMessages((prevState) => [...prevState, e.data as string])

            setState(`connection message: ${e.data as string}`)

            const { action }: Action = JSON.parse(e.data as string)

            switch (action) {
                case 'game_start':
                    break
                case 'new_game':
                    break
                case 'new_word_list':
                    break
                default:
                    break
            }
        })
    }, [])

    return (
        <div>
            <h1>Game App: {state}</h1>
            <p>Messages:</p>
            <ul>
                {messages.map((v, k) => (
                    <li key={k}>{v}</li>
                ))}
            </ul>
        </div>
    )
}

export default GameApp
