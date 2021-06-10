import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { CardType, turnCard } from '../store/board'

const UNTURNED_CARD_COLOUR_CLASSES = 'bg-yellow-200 text-yellow-700'

interface CardProps {
    id: number
}

function getColourClasses(type: CardType): string {
    switch (type) {
        case CardType.RED:
            return 'bg-red-700 text-gray-100'
        case CardType.BLUE:
            return 'bg-blue-700 text-gray-100'
        case CardType.ASSASSIN:
            return 'bg-gray-800 text-gray-100'
        case CardType.BYSTANDER:
            return 'bg-gray-200 text-gray-700'
    }
}

export default function ({ id }: CardProps) {
    const dispatch = useAppDispatch()

    const { type, turned, word } = useAppSelector(
        (state) => state.board.cards[id]
    )

    function turn() {
        dispatch(turnCard(id))
    }

    return (
        <div
            className={`flex justify-center items-center rounded-xl cursor-pointer transition-colors duration-500 ${
                turned ? getColourClasses(type) : UNTURNED_CARD_COLOUR_CLASSES
            }`}
            onClick={turn}
        >
            {word}
        </div>
    )
}
