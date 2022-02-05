import React, { ReactElement, useEffect, useRef, useState } from 'react'
import {
    Action,
    stringifyAction,
    ClickCardAction,
    JoinGameAction,
    // SendWordListAction,
} from '../action'

const SpymasterApp = (): ReactElement => {
    const [state, setState] = useState('connection uninitialised')
    const [code, setCode] = useState('')
    const [messages, setMessages] = useState<string[]>([])
    const ws = useRef<WebSocket | null>(null)

    useEffect(() => {
        ws.current = new WebSocket(
            'ws://127.0.0.1:80/screen-share-codenames/spymaster/ws'
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

            const { action, payload }: Action = JSON.parse(e.data as string)

            switch (action) {
                case 'send_word_list':
                    // const sendWordListAction: SendWordListAction =
                    //     JSON.parse(payload)
                    break
                case 'click_card': {
                    const clickCardAction: ClickCardAction = JSON.parse(payload)

                    setState(`card clicked: ${clickCardAction.cardUuid}`)

                    break
                }
                default:
                    break
            }
        })

        ws.current.addEventListener('error', () => {
            setState('connection errored')
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleJoinClick(): void {
        const joinGameAction: JoinGameAction = {
            code: code,
        }

        ws.current?.send(stringifyAction('join_game', joinGameAction))
    }

    return (
        <div>
            <h1>Spymaster App: {state}</h1>
            <input
                type="text"
                placeholder="code"
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleJoinClick}>Join</button>
            <p>Messages:</p>
            <ul>
                {messages.map((v, k) => (
                    <li key={k}>{v}</li>
                ))}
            </ul>
        </div>
    )
}

export default SpymasterApp
