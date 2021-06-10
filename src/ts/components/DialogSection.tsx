import React from 'react'
import { useAppSelector } from '../hooks'
import { DialogType } from '../store/dialog'
import CloseWindowDialog from './dialog/CloseWindowDialog'
import NewGameDialog from './dialog/NewGameDialog'
import NewWordListDialog from './dialog/NewWordListDialog'
import RevealAllWordsDialog from './dialog/RevealAllWordsDialog'

export default function () {
    const type = useAppSelector((state) => state.dialog.type)

    function getDialogToShow(): any {
        switch (type) {
            case DialogType.NEW_GAME:
                return <NewGameDialog />
            case DialogType.NEW_WORD_LIST:
                return <NewWordListDialog />
            case DialogType.REVEAL_ALL_WORDS:
                return <RevealAllWordsDialog />
            case DialogType.EXIT:
                return <CloseWindowDialog />
        }
    }

    return (
        <div
            className={`absolute z-40 top-0 left-0 w-screen h-screen bg-opacity-40 bg-black ${
                type === null ? 'invisible' : 'visible'
            }`}
        >
            <div className="flex w-full h-full justify-center items-center">
                {getDialogToShow()}
            </div>
        </div>
    )
}
