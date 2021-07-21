import { screen } from '@testing-library/react'
import React from 'react'
import TitleBar from '../../components/TitleBar'
import { render } from '../test-utils'

test('has new game', () => {
    render(<TitleBar />)

    expect(screen.getByRole('button', { name: /new game/i })).toHaveTextContent(
        'New Game'
    )
})

test('has new word list', () => {
    render(<TitleBar />)

    expect(
        screen.getByRole('button', { name: /new word list/i })
    ).toHaveTextContent('New Word List')
})

test('has copy word list', () => {
    render(<TitleBar />)

    expect(
        screen.getByRole('button', { name: /copy word list/i })
    ).toHaveTextContent('Copy Word List')
})

test('has reveal all words', () => {
    render(<TitleBar />)

    expect(
        screen.getByRole('button', { name: /reveal all words/i })
    ).toHaveTextContent('Reveal All Words')
})
