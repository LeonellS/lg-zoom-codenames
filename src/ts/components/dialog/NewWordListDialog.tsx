import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { newBoard } from '../../store/board'
import { createNotification } from '../../store/notification'
import Dialog from './Dialog'

export default function () {
    const dispatch = useAppDispatch()

    const startingTeam = useAppSelector((state) => state.game.startingTeam)

    function getNewWordList() {
        dispatch(newBoard(startingTeam))
        dispatch(createNotification('Created new word list'))
    }

    return (
        <Dialog positiveButtonText="Yes" positiveButtonOnClick={getNewWordList}>
            Get new word list?
        </Dialog>
    )
}
