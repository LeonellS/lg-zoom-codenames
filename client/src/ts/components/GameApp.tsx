import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Action } from '../action/action'
import {
    GameStartPayload,
    NewGamePayload,
    NewWordListPayload,
} from '../action/payload'
import { newGame, newWordList, setCode } from '../store/game'
import { createNotification } from '../store/notification'
import { useAppSelector } from '../store/store'
import Header from './common/Header'
import Board from './game/Board'
import Dialog from './game/Dialog'
import Notification from './common/Notification'
import Fullscreen from './game/Fullscreen'

declare const WS_HOST_NAME: string

const GameApp = (): ReactElement => {
    const dispatch = useDispatch()

    const wsRef = useRef<WebSocket | null>(null)

    const [ws, setWs] = useState(wsRef.current)

    const cards = useAppSelector((state) => state.game.cards)

    useEffect(() => {
        const wsConnection = new WebSocket(
            `ws://${WS_HOST_NAME}/screen-share-codenames/game/ws`
        )

        wsConnection.addEventListener('open', () => {
            dispatch(createNotification('WebSocket connection opened'))
        })

        wsConnection.addEventListener('close', () => {
            dispatch(createNotification('WebSocket connection closed'))
        })

        wsConnection.addEventListener('message', (e) => {
            const { action, payload }: Action = JSON.parse(e.data as string)

            switch (action) {
                case 'game_start': {
                    if (payload != null) {
                        const { code, cards, startingTeam }: GameStartPayload =
                            JSON.parse(payload)

                        const newGamePayload: NewGamePayload = {
                            cards,
                            startingTeam,
                        }

                        dispatch(setCode(code))
                        dispatch(newGame(newGamePayload))
                    }

                    break
                }
                case 'new_game': {
                    if (payload != null) {
                        const newGamePayload: NewGamePayload =
                            JSON.parse(payload)

                        dispatch(newGame(newGamePayload))
                    }

                    break
                }
                case 'new_word_list': {
                    if (payload != null) {
                        const { cards }: NewWordListPayload =
                            JSON.parse(payload)

                        dispatch(newWordList(cards))
                    }

                    break
                }
                default:
                    break
            }
        })

        wsConnection.addEventListener('error', () => {
            dispatch(createNotification('WebSocket encountered an error'))
        })

        setWs(wsConnection)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header forGame={true} />

            <Fullscreen />

            <div className="game__container">
                <div className="game__mobile">
                    <img
                        src="/public/asset/device.svg"
                        alt="Icon of desktop, laptop, and tablet"
                    />
                    <div className="mobile__text">
                        <p className="mobile__title">Screen Share Codenames</p>
                        <p>works best on bigger screens</p>
                    </div>
                </div>

                <div className="game__desktop">
                    <Board ws={ws} cards={cards} />
                </div>
            </div>

            <Dialog ws={ws} />
            <Notification />
        </>
    )
}

export default GameApp
