import React from 'react'
import { useAppSelector } from '../hooks'
import Card from './Card'

export default function () {
    const cards = useAppSelector((state) => state.board.cards)

    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="grid grid-cols-5 grid-rows-5 gap-x-4 gap-y-4 container h-full p-8 text-3xl capitalize font-bold">
                {cards.map((_: any, index: number) => (
                    <Card key={index} id={index} />
                ))}
            </div>
        </div>
    )
}
