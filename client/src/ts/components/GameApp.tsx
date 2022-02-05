import React, { ReactElement, useEffect, useRef, useState } from 'react'
import {
    Action,
    ClickCardAction,
    GameStartAction,
    NewGameAction,
    NewWordListAction,
    stringifyAction,
} from '../action'
import { Card } from '../game/card'
import { StartingTeam } from '../game/team'

interface CardButtonProps {
    uuid: string
    word: string
    ws: WebSocket | null
}

const CardButton = ({ uuid, word, ws }: CardButtonProps): ReactElement => {
    function handleClick(): void {
        const clickCardAction: ClickCardAction = {
            cardUuid: uuid,
        }

        ws?.send(stringifyAction('click_card', clickCardAction))
    }

    return <button onClick={handleClick}>{word}</button>
}

const GameApp = (): ReactElement => {
    const ws = useRef<WebSocket | null>(null)

    const [state, setState] = useState('connection uninitialised')

    const [code, setCode] = useState<string | null>(null)

    const [startingTeam, setStartingTeam] = useState<StartingTeam | null>(null)

    const [cards, setCards] = useState<Card[]>([])

    function handleNewGameClick(): void {
        ws.current?.send(stringifyAction('new_game'))
    }

    function handleNewWordListClick(): void {
        ws.current?.send(stringifyAction('new_word_list'))
    }

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
            const { action, payload }: Action = JSON.parse(e.data as string)

            switch (action) {
                case 'game_start': {
                    if (payload != null) {
                        const { code, startingTeam, cards }: GameStartAction =
                            JSON.parse(payload)

                        setCode(code)
                        setStartingTeam(startingTeam)
                        setCards(cards)
                    }

                    break
                }
                case 'new_game': {
                    if (payload != null) {
                        const { startingTeam, cards }: NewGameAction =
                            JSON.parse(payload)

                        setStartingTeam(startingTeam)
                        setCards(cards)
                    }

                    break
                }
                case 'new_word_list': {
                    if (payload != null) {
                        const { cards }: NewWordListAction = JSON.parse(payload)

                        setCards(cards)
                    }

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

    return (
        <div>
            <h1>Game App: {state}</h1>
            <button onClick={handleNewGameClick}>New Game</button>
            <button onClick={handleNewWordListClick}>New Word List</button>
            {code != null && <p>Code: {code}</p>}
            {startingTeam != null && <p>Starting Team: {startingTeam}</p>}
            {cards.map((c) => (
                <CardButton
                    key={c.uuid}
                    uuid={c.uuid}
                    word={c.word}
                    ws={ws.current}
                />
            ))}
        </div>
    )
}

export default GameApp
