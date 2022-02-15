import React, { ReactElement } from 'react'
import { stringifyAction } from '../../action/action'
import { ClickCardPayload } from '../../action/payload'
import { CardType } from '../../game/card'
import { turnCard } from '../../store/game'
import { useAppDispatch } from '../../store/store'

interface Props {
    uuid: string
    type: CardType
    word: string
    turned: boolean
    ws: WebSocket | null
}

const Card = ({ uuid, type, word, turned, ws }: Props): ReactElement => {
    const dispatch = useAppDispatch()

    function handleClick(): void {
        if (turned) return

        const payload: ClickCardPayload = {
            cardUuid: uuid,
        }

        dispatch(turnCard(uuid))
        ws?.send(stringifyAction('click_card', payload))
    }

    return (
        <button
            className={`card card--${turned ? type.toLowerCase() : 'unturned'}`}
            onClick={handleClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 300 200"
            >
                <rect
                    width="284"
                    height="184"
                    rx="36"
                    transform="translate(8 8)"
                />
                <text
                    x="50%"
                    y="52%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="38"
                    fontFamily="SegoeUI-Bold, Segoe UI"
                    fontWeight="700"
                >
                    {word}
                </text>
            </svg>
        </button>
    )
}

export default Card
