import React from 'react'
import { useAppDispatch } from '../../hooks'
import { turnAllCards } from '../../store/board'
import { createNotification } from '../../store/notification'
import Dialog from './Dialog'

export default function () {
    const dispatch = useAppDispatch()

    function revealAllWords() {
        dispatch(turnAllCards())
        dispatch(createNotification('Revealed all words'))
    }

    return (
        <Dialog
            positiveButtonText="Reveal"
            positiveButtonOnClick={revealAllWords}
        >
            Reveal all words?
        </Dialog>
    )
}
