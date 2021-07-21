import React, { ReactElement } from 'react'
import { CardType, turnCard } from '../store/board'
import { useAppDispatch } from '../store/store'

interface Props {
    id: number
    turned: boolean
    type: CardType
    children: string
}

function getColourClass(type: CardType): string {
    switch (type) {
        case CardType.RED:
            return 'red'
        case CardType.BLUE:
            return 'blue'
        case CardType.ASSASSIN:
            return 'assassin'
        case CardType.BYSTANDER:
        default:
            return 'bystander'
    }
}

const Card = ({ id, turned, type, children }: Props): ReactElement => {
    const dispatch = useAppDispatch()

    function handleClick(): void {
        dispatch(turnCard(id))
    }

    return (
        <button
            className={`card card--${
                turned ? getColourClass(type) : 'unturned'
            }`}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default Card
