import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { stringifyAction } from '../../action/action'
import { revealAllWords } from '../../store/game'
import { DialogType, hideDialog } from '../../store/dialog'
import { useAppDispatch, useAppSelector } from '../../store/store'

interface Props {
    message: string
    positiveString: string
    onClick: () => void
}

interface WsProps {
    ws: WebSocket | null
}

const Dialog = ({ message, positiveString, onClick }: Props): ReactElement => {
    const dispatch = useAppDispatch()

    function handleCancel(): void {
        dispatch(hideDialog())
    }

    function handlePositive(): void {
        onClick()
        dispatch(hideDialog())
    }

    return (
        <div className="dialog">
            <div className="dialog__message">{message}</div>
            <div className="dialog__action">
                <button
                    className="button button--cancel"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    className="button button--primary"
                    onClick={handlePositive}
                >
                    {positiveString}
                </button>
            </div>
        </div>
    )
}

const NewGameDialog = ({ ws }: WsProps): ReactElement => {
    function handleClick(): void {
        ws?.send(stringifyAction('new_game'))
    }

    return (
        <Dialog
            message="Create new game?"
            positiveString="Create"
            onClick={handleClick}
        />
    )
}

const NewWordListDialog = ({ ws }: WsProps): ReactElement => {
    function handleClick(): void {
        ws?.send(stringifyAction('new_word_list'))
    }

    return (
        <Dialog
            message="Create new word list?"
            positiveString="Create"
            onClick={handleClick}
        />
    )
}

const RevealAllWordsDialog = (): ReactElement => {
    const dispatch = useDispatch()

    function handleClick(): void {
        dispatch(revealAllWords())
    }

    return (
        <Dialog
            message="Reveal all words?"
            positiveString="Reveal"
            onClick={handleClick}
        />
    )
}

function getDialog(
    type: DialogType | null,
    ws: WebSocket | null
): ReactElement | undefined {
    switch (type) {
        case DialogType.NewGame:
            return <NewGameDialog ws={ws} />
        case DialogType.NewWordList:
            return <NewWordListDialog ws={ws} />
        case DialogType.RevealAllWord:
            return <RevealAllWordsDialog />
        default:
            return undefined
    }
}

const Container = ({ ws }: WsProps): ReactElement => {
    const type = useAppSelector((state) => state.dialog.type)

    return (
        <div
            className={`dialog__container dialog__container--${
                type === null ? 'hide' : 'show'
            }`}
        >
            {getDialog(type, ws)}
        </div>
    )
}

export default Container
