import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { revealAllWords } from '../store/board'

import { DialogType, hideDialog } from '../store/dialog'
import { newGame, newWordList } from '../store/game'
import { useAppDispatch, useAppSelector } from '../store/store'

interface DialogProps {
    children: string
    action: string
    onClick: () => void
}

const Dialog = ({ children, action, onClick }: DialogProps): ReactElement => {
    const dispatch = useAppDispatch()

    function handleClickCancel(): void {
        dispatch(hideDialog())
    }

    function handleClickPositive(): void {
        onClick()
        dispatch(hideDialog())
    }

    return (
        <div className="dialog" role="dialog">
            <p className="dialog__text">{children}</p>
            <div className="dialog__actions">
                <button
                    className="button button--neutral button--small"
                    onClick={handleClickCancel}
                >
                    Cancel
                </button>
                <button
                    className="button button--positive button--small"
                    onClick={handleClickPositive}
                >
                    {action}
                </button>
            </div>
        </div>
    )
}

const NewGameDialog = (): ReactElement => {
    const dispatch = useDispatch()

    function handleClick(): void {
        dispatch(newGame(true))
    }

    return (
        <Dialog action="Start" onClick={handleClick}>
            Start new game?
        </Dialog>
    )
}

const NewWordList = (): ReactElement => {
    const dispatch = useDispatch()

    function handleClick(): void {
        dispatch(newWordList())
    }

    return (
        <Dialog action="Create" onClick={handleClick}>
            Create new word list?
        </Dialog>
    )
}

const RevealAllWords = (): ReactElement => {
    const dispatch = useDispatch()

    function handleClick(): void {
        dispatch(revealAllWords())
    }

    return (
        <Dialog action="Reveal" onClick={handleClick}>
            Reveal all words?
        </Dialog>
    )
}

function getDialog(type: DialogType | null): ReactElement | undefined {
    switch (type) {
        case DialogType.NEW_GAME:
            return <NewGameDialog />
        case DialogType.NEW_WORD_LIST:
            return <NewWordList />
        case DialogType.REVEAL_ALL_WORD:
            return <RevealAllWords />
        default:
            return undefined
    }
}

const Container = (): ReactElement => {
    const type = useAppSelector((state) => state.dialog.type)

    return (
        <div
            className={`dialog__container ${
                type === null
                    ? 'dialog__container--hide'
                    : 'dialog__container--show'
            }`}
        >
            {getDialog(type)}
        </div>
    )
}

export default Container
