import React, { ReactElement, useEffect, useRef, useState } from 'react'
import {
    Action,
    stringifyAction,
    ClickCardAction,
    JoinGameAction,
    SendWordListAction,
} from '../action'
import { Card, CardType } from '../game/card'

const SpymasterApp = (): ReactElement => {
    const ws = useRef<WebSocket | null>(null)

    const [state, setState] = useState('connection uninitialised')

    const [code, setCode] = useState('')

    const [cards, setCards] = useState<Card[]>([])

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
            const { action, payload }: Action = JSON.parse(e.data as string)

            switch (action) {
                case 'send_word_list': {
                    if (payload != null) {
                        const { cards }: SendWordListAction =
                            JSON.parse(payload)

                        setCards(cards)
                    }

                    break
                }
                case 'click_card': {
                    if (payload != null) {
                        const { cardUuid }: ClickCardAction =
                            JSON.parse(payload)

                        console.log(cardUuid)

                        setCards((prevState) =>
                            prevState.map((c) => {
                                if (c.uuid === cardUuid) {
                                    c.turned = true
                                    return c
                                } else {
                                    return c
                                }
                            })
                        )
                    }

                    break
                }
                case 'game_disconnect': {
                    setCards([])

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

            <h2>Assassin</h2>
            {cards
                .filter((c) => c.type === CardType.Assassin)
                .map((c) =>
                    c.turned ? (
                        <p key={c.uuid} style={{ color: 'gray' }}>
                            {c.word}
                        </p>
                    ) : (
                        <p key={c.uuid}>{c.word}</p>
                    )
                )}

            <h2>Red</h2>
            {cards
                .filter((c) => c.type === CardType.Red)
                .map((c) =>
                    c.turned ? (
                        <p key={c.uuid} style={{ color: 'gray' }}>
                            {c.word}
                        </p>
                    ) : (
                        <p key={c.uuid}>{c.word}</p>
                    )
                )}

            <h2>Blue</h2>
            {cards
                .filter((c) => c.type === CardType.Blue)
                .map((c) =>
                    c.turned ? (
                        <p key={c.uuid} style={{ color: 'gray' }}>
                            {c.word}
                        </p>
                    ) : (
                        <p key={c.uuid}>{c.word}</p>
                    )
                )}

            <h2>Bystander</h2>
            {cards
                .filter((c) => c.type === CardType.Bystander)
                .map((c) =>
                    c.turned ? (
                        <p key={c.uuid} style={{ color: 'gray' }}>
                            {c.word}
                        </p>
                    ) : (
                        <p key={c.uuid}>{c.word}</p>
                    )
                )}
        </div>
    )
}

export default SpymasterApp
