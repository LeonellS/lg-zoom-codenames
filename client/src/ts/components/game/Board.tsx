import React, { ReactElement } from 'react'
import { Card } from '../../game/card'
import CardElement from './Card'

interface Props {
    cards: Card[]
    ws: WebSocket | null
}

const Board = ({ cards, ws }: Props): ReactElement => {
    return (
        <div className="board__container">
            <div className="board">
                {cards.map(({ uuid, type, turned, word }) => (
                    <CardElement
                        key={uuid}
                        uuid={uuid}
                        type={type}
                        turned={turned}
                        word={word}
                        ws={ws}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board
