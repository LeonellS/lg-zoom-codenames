import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { DialogType, showDialog } from '../store/dialog'
import { copyWordList } from '../store/game'
import { useAppDispatch } from '../store/store'

const TitleBar = (): ReactElement => {
    const appDispatch = useAppDispatch()
    const dispatch = useDispatch()

    function handleClickNewGame(): void {
        appDispatch(showDialog(DialogType.NEW_GAME))
    }

    function handleClickNewWordList(): void {
        appDispatch(showDialog(DialogType.NEW_WORD_LIST))
    }

    function handleClickCopyWordList(): void {
        dispatch(copyWordList())
    }

    function handleClickRevealAlLWords(): void {
        appDispatch(showDialog(DialogType.REVEAL_ALL_WORD))
    }

    return (
        <div className="title-bar">
            <div className="title-bar__title">Screen Share Codenames</div>
            <button className="title-bar__action" onClick={handleClickNewGame}>
                New Game
            </button>
            <button
                className="title-bar__action"
                onClick={handleClickNewWordList}
            >
                New Word List
            </button>
            <button
                className="title-bar__action"
                onClick={handleClickCopyWordList}
            >
                Copy Word List
            </button>
            <button
                className="title-bar__action"
                onClick={handleClickRevealAlLWords}
            >
                Reveal All Words
            </button>
        </div>
    )
}

export default TitleBar
