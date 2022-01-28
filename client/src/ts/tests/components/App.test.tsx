import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../../components/App'

test('shows hello world', () => {
    render(<App />)

    expect(screen.getByRole('heading')).toHaveTextContent('Hello World')
})
