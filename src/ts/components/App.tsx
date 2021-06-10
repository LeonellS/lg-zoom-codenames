import React, { useEffect } from 'react'
import TitleBar from './TitleBar'
import Notification from './Notification'
import Board from './Board'
import { useAppDispatch, useAppSelector } from '../hooks'
import DialogSection from './DialogSection'
import { createNotification } from '../store/notification'
import { newBoard } from '../store/board'
import { StartingTeam } from '../store/game'

export default function App() {
    const dispatch = useAppDispatch()

    const startingTeam = useAppSelector((state) => state.game.startingTeam)

    useEffect(() => {
        dispatch(newBoard(startingTeam))
        dispatch(createNotification(`${startingTeam === StartingTeam.RED ? 'Red' : 'Blue'} team starts`))
    })

    return (
        <div className="w-screen h-screen fixed flex flex-col">
            <TitleBar />
            <Board />
            <DialogSection />
            <Notification />
        </div>
    )
}
