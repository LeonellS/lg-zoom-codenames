import React, { ReactElement } from 'react'
import { DialogType, showDialog } from '../../store/dialog'
import { createNotification } from '../../store/notification'
import { useAppDispatch } from '../../store/store'

interface Props {
    code: string
}

const GameMenu = ({ code }: Props): ReactElement => {
    const dispatch = useAppDispatch()

    function handleNewGame(): void {
        dispatch(showDialog(DialogType.NewGame))
    }

    function handleNewWordList(): void {
        dispatch(showDialog(DialogType.NewWordList))
    }

    function handleRevealAllWords(): void {
        dispatch(showDialog(DialogType.RevealAllWord))
    }

    function handleCopyGameCode(): void {
        navigator.clipboard
            .writeText(
                `Game code: ${code.toUpperCase()}\nJoin as spymaster at https://leonell.dev/screen-share-codenames/spymaster`
            )
            .then(() => {
                dispatch(createNotification('Copied game code'))
            })
            .catch(() => {
                dispatch(createNotification('Error copying game code'))
            })
    }

    return (
        <div className="game-menu">
            <button className="game-menu__button" onClick={handleNewGame}>
                New Game
            </button>
            <button className="game-menu__button" onClick={handleNewWordList}>
                New Word List
            </button>
            <button
                className="game-menu__button"
                onClick={handleRevealAllWords}
            >
                Reveal All Words
            </button>
            <button className="game-menu__button" onClick={handleCopyGameCode}>
                Copy Game Code
            </button>
        </div>
    )
}

export default GameMenu
