import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { newGame } from '../store/game'
import { useAppSelector } from '../store/store'
import Card from './Card'

const Board = (): ReactElement => {
    const dispatch = useDispatch()

    const cards = useAppSelector((state) => state.board.cards)

    useEffect(() => {
        dispatch(newGame(false))
    }, [dispatch])

    return (
        <section className="board">
            <div className="board__grid">
                {cards.map(({ id, turned, type, word }) => (
                    <Card key={id} id={id} turned={turned} type={type}>
                        {word}
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default Board
