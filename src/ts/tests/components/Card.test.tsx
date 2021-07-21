import { screen } from '@testing-library/react'
import React from 'react'
import Card from '../../components/Card'
import { CardType } from '../../store/board'
import { render } from '../test-utils'

test('has text', () => {
    render(
        <Card id={0} turned={false} type={CardType.RED}>
            card
        </Card>
    )

    expect(screen.getByRole('button')).toHaveTextContent('card')
})

test('has unturned class', () => {
    render(
        <Card id={0} turned={false} type={CardType.RED}>
            card
        </Card>
    )

    expect(screen.getByRole('button')).toHaveClass('card--unturned')
})

test('has red class', () => {
    render(
        <Card id={0} turned={true} type={CardType.RED}>
            card
        </Card>
    )

    expect(screen.getByRole('button')).toHaveClass('card--red')
})

test('has blue class', () => {
    render(
        <Card id={0} turned={true} type={CardType.BLUE}>
            card
        </Card>
    )

    expect(screen.getByRole('button')).toHaveClass('card--blue')
})

test('has assassin class', () => {
    render(
        <Card id={0} turned={true} type={CardType.ASSASSIN}>
            card
        </Card>
    )

    expect(screen.getByRole('button')).toHaveClass('card--assassin')
})

test('has bystander class', () => {
    render(
        <Card id={0} turned={true} type={CardType.BYSTANDER}>
            card
        </Card>
    )

    expect(screen.getByRole('button')).toHaveClass('card--bystander')
})
