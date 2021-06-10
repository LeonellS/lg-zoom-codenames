import React from 'react'
import { useAppDispatch } from '../../hooks'
import { switchStartingTeam } from '../../store/game'
import Dialog from './Dialog'

export default function () {
    const dispatch = useAppDispatch()

    function startNewGame() {
        dispatch(switchStartingTeam())
    }

    return (
        <Dialog positiveButtonText="Start" positiveButtonOnClick={startNewGame}>
            Start a new game?
        </Dialog>
    )
}
