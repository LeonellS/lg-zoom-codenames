import { ipcRenderer } from 'electron'
import React, { SyntheticEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { CardType } from '../store/board'
import { DialogType, showDialog } from '../store/dialog'
import { StartingTeam } from '../store/game'
import { createNotification } from '../store/notification'

export default function () {
    const dispatch = useAppDispatch()

    const startingTeam = useAppSelector((state) => state.game.startingTeam)
    const cards = useAppSelector((state) => state.board.cards)

    function handleNewGame(e: SyntheticEvent) {
        e.preventDefault()
        dispatch(showDialog(DialogType.NEW_GAME))
    }

    function handleNewWordList(e: SyntheticEvent) {
        e.preventDefault()
        dispatch(showDialog(DialogType.NEW_WORD_LIST))
    }

    function handleCopyWordList(e: SyntheticEvent) {
        e.preventDefault()

        const assassin = cards
            .filter(({ type }) => type === CardType.ASSASSIN)
            .map(({ word }) => word)
            .join('\n')

        const redTeam = cards
            .filter(({ type }) => type === CardType.RED)
            .map(({ word }) => word)
            .join('\n')

        const blueTeam = cards
            .filter(({ type }) => type === CardType.BLUE)
            .map(({ word }) => word)
            .join('\n')

        const list = []

        list.push(
            `Starting Team: ${
                startingTeam === StartingTeam.RED ? 'Red' : 'Blue'
            }`,
            `Assassin: \n${assassin}`,
            `Red: \n${redTeam}`,
            `Blue: \n${blueTeam}`
        )

        navigator.clipboard.writeText(list.join('\n\n'))

        dispatch(createNotification('Copied word list'))
    }

    function handleRevealAllWords(e: SyntheticEvent) {
        e.preventDefault()
        dispatch(showDialog(DialogType.REVEAL_ALL_WORDS))
    }

    function handleMinimiseWindow(e: SyntheticEvent) {
        e.preventDefault()
        ipcRenderer.send('minimise')
    }

    function handleCloseWindow(e: SyntheticEvent) {
        e.preventDefault()
        dispatch(showDialog(DialogType.EXIT))
    }

    return (
        <div className="flex flex-shrink-0 justify-between h-7 w-full bg-gray-800 text-gray-500 select-none">
            <div className="flex ml-4 space-x-2 text-xs">
                <div className="flex items-center px-2 font-bold text-xs">
                    Screen Share Codenames
                </div>
                <a
                    className="cursor-pointer flex items-center px-2 transition-colors duration-75 hover:bg-gray-700 hover:text-gray-400"
                    onClick={handleNewGame}
                >
                    New Game
                </a>
                <a
                    className="cursor-pointer flex items-center px-2 transition-colors duration-75 hover:bg-gray-700 hover:text-gray-400"
                    onClick={handleNewWordList}
                >
                    New Word List
                </a>
                <a
                    className="cursor-pointer flex items-center px-2 transition-colors duration-75 hover:bg-gray-700 hover:text-gray-400"
                    onClick={handleCopyWordList}
                >
                    Copy Word List
                </a>
                <a
                    className="cursor-pointer flex items-center px-2 transition-colors duration-75 hover:bg-gray-700 hover:text-gray-400"
                    onClick={handleRevealAllWords}
                >
                    Reveal All Words
                </a>
            </div>

            <div className="flex">
                <a
                    className="cursor-pointer flex justify-center items-center w-11 h-full transition-colors duration-75 hover:bg-gray-700"
                    onClick={handleMinimiseWindow}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                    >
                        <path d="M14 8v1H3V8h11z" />
                    </svg>
                </a>
                <a
                    className="cursor-pointer flex justify-center items-center w-11 h-full transition-colors duration-75 hover:bg-red-700 hover:text-gray-50"
                    onClick={handleCloseWindow}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"
                        />
                    </svg>
                </a>
            </div>
        </div>
    )
}
