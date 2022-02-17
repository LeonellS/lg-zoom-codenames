import React, { ReactElement } from 'react'
import { Card, CardType } from '../../game/card'
import { useAppSelector } from '../../store/store'

interface Props {
    type: CardType
    cards: Card[]
}

const List = ({ type, cards }: Props): ReactElement => {
    return (
        <div className="word-list__container">
            <div
                className={`word-list__header word-list__header--${type.toLowerCase()}`}
            >
                {type}
            </div>
            <ul className="word-list">
                {cards
                    .filter((card) => card.type === type)
                    .map(({ word, uuid, turned }) => (
                        <li
                            className={`word-list__word ${
                                turned ? 'word-list__word--clicked' : ''
                            }`}
                            key={uuid}
                        >
                            {word}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

const Container = (): ReactElement => {
    const cards = useAppSelector((state) => state.game.cards)

    return (
        <div className="spymaster__container">
            <div className="spymaster__word-list">
                <List type={CardType.Assassin} cards={cards} />
                <List type={CardType.Red} cards={cards} />
                <List type={CardType.Blue} cards={cards} />
                <List type={CardType.Bystander} cards={cards} />
            </div>
        </div>
    )
}

export default Container
