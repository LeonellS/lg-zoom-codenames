import { render, RenderOptions, RenderResult } from '@testing-library/react'
import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'

function customRender(
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>
): RenderResult {
    const wrapper: FC = ({ children }) => (
        <Provider store={store}>{children}</Provider>
    )

    return render(ui, { wrapper, ...options })
}

export { customRender as render }
