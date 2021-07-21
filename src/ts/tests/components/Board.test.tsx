import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import Board from '../../components/Board'
import { render } from '../test-utils'

test('has 25 cards', () => {
    render(<Board />)

    expect(screen.getAllByRole('button')).toHaveLength(25)
})

test('card turns when clicked', () => {
    render(<Board />)

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(screen.getAllByRole('button')[0]).not.toHaveClass('card--unturned')
})
