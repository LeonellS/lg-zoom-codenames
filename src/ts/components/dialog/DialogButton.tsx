import React from 'react'

interface DialogButtonProps {
    children: string
    onClick: () => void
}

export default function ({ children, onClick }: DialogButtonProps) {
    return (
        <a
            className="cursor-pointer rounded px-3 py-1 border border-gray-700 transition-colors duration-75 hover:bg-gray-700"
            onClick={onClick}
        >
            {children}
        </a>
    )
}
