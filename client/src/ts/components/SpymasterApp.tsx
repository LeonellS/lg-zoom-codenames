import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Action } from '../action/action'
import { turnCard, updateCards } from '../store/game'
import { createNotification } from '../store/notification'
import { useAppDispatch } from '../store/store'
import WordList from './spymaster/WordList'
import JoinGameForm from './spymaster/JoinGameForm'
import Header from './common/Header'
import Notification from './common/Notification'
import { ClickCardPayload, SendWordListPayload } from '../action/payload'

declare const WS_HOST_NAME: string

const SpymasterApp = (): ReactElement => {
    const dispatch = useAppDispatch()

    const wsRef = useRef<WebSocket | null>(null)

    const [ws, setWs] = useState(wsRef.current)
    const [hasGame, setHasGame] = useState(false)

    useEffect(() => {
        const wsConnection = new WebSocket(
            `ws://${WS_HOST_NAME}/screen-share-codenames/spymaster/ws`
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
                case 'join_success': {
                    setHasGame(true)

                    break
                }

                case 'join_fail': {
                    dispatch(createNotification('Game does not exist'))

                    break
                }
                case 'send_word_list': {
                    if (payload != null) {
                        const { cards }: SendWordListPayload =
                            JSON.parse(payload)

                        dispatch(updateCards(cards))
                    }

                    break
                }
                case 'click_card': {
                    if (payload != null) {
                        const { cardUuid }: ClickCardPayload =
                            JSON.parse(payload)

                        dispatch(turnCard(cardUuid))
                    }

                    break
                }
                case 'game_disconnect': {
                    setHasGame(false)
                    dispatch(createNotification('Gamemaster disconnected'))

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
            <Header forGame={false} />

            {hasGame ? <WordList /> : <JoinGameForm ws={ws} />}

            <Notification />
        </>
    )
}

export default SpymasterApp
