import { fireEvent, screen } from '@testing-library/react'
import React from 'react'
import App from '../../components/App'
import { render } from '../test-utils'

test('clicking new game shows new game dialog', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /new game/i }))

    expect(screen.getByRole('dialog')).toHaveTextContent(/start new game\?/i)
})

test('clicking start on new game dialog', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /new game/i }))
    fireEvent.click(screen.getByRole('button', { name: /start/i }))

    expect(screen.getAllByRole('alert').slice(-1)[0]).toHaveTextContent(
        /starting team: [red|blue]/i
    )
})

test('clicking new word list shows new word list dialog', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /new word list/i }))

    expect(screen.getByRole('dialog')).toHaveTextContent(
        /create new word list\?/i
    )
})

test('clicking create on new word list dialog', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /new word list/i }))
    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    expect(screen.getAllByRole('alert').slice(-1)[0]).toHaveTextContent(
        /created new word list/i
    )
})

test('clicking reveal all words shows reveal all words dialog', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /reveal all words/i }))

    expect(screen.getByRole('dialog')).toHaveTextContent(/reveal all words\?/i)
})

test('clicking reveal on reveal all words dialog', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /reveal all words/i }))
    fireEvent.click(screen.getByRole('button', { name: /reveal$/i }))

    expect(screen.getAllByRole('alert').slice(-1)[0]).toHaveTextContent(
        /revealed all words/i
    )
})
