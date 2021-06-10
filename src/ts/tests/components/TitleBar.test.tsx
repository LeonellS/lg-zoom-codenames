import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import TitleBar from '../../components/TitleBar'

const mockStore = configureStore()

describe('components/TitleBar', () => {
    let store: any
    let wrapper: any

    beforeEach(() => {
        store = mockStore({})

        wrapper = mount(
            <Provider store={store}>
                <TitleBar />
            </Provider>
        )
    })

    describe('menu', () => {
        let result: string[]

        beforeEach(() => {
            result = wrapper.find('a').map((e: ReactWrapper) => e.text())
        })

        it('has new game', () => {
            const expected = 'New Game'

            expect(result).toContain(expected)
        })

        it('has new word list', () => {
            const expected = 'New Word List'

            expect(result).toContain(expected)
        })

        it('has copy word list', () => {
            const expected = 'Copy Word List'

            expect(result).toContain(expected)
        })

        it('has reveal all words', () => {
            const expected = 'Reveal All Words'

            expect(result).toContain(expected)
        })
    })
})
