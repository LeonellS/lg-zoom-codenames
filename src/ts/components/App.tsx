import React, { ReactElement } from 'react'
import Board from './Board'
import Dialog from './Dialog'
import FullScreenButton from './FullscreenButton'
import Notifications from './Notification'
import TitleBar from './TitleBar'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

const App = (): ReactElement => {
    const handle = useFullScreenHandle()

    return (
        <FullScreen handle={handle}>
            <main className="window">
                <TitleBar />
                <FullScreenButton handle={handle} />
                <Board />
                <Dialog />
                <Notifications />
            </main>
        </FullScreen>
    )
}

export default App
