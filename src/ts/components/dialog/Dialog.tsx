import React from 'react'
import { useAppDispatch } from '../../hooks'
import { hideDialog } from '../../store/dialog'
import DialogButton from './DialogButton'

const DIALOG_NEGATIVE_BUTTON_TEXT = 'Cancel'

interface DialogProps {
    children: string
    positiveButtonText: string
    positiveButtonOnClick: () => void
}

export default function ({
    children,
    positiveButtonText,
    positiveButtonOnClick,
}: DialogProps) {
    const dispatch = useAppDispatch()

    function onClickNegativeButton() {
        dispatch(hideDialog())
    }

    function onClickPositiveButton() {
        positiveButtonOnClick()
        dispatch(hideDialog())
    }

    return (
        <div className="w-60 bg-gray-900 border border-gray-700 rounded p-3">
            <div className="text-sm">{children}</div>

            <div className="flex justify-end mt-6 space-x-2 text-xs">
                <DialogButton onClick={onClickNegativeButton}>
                    {DIALOG_NEGATIVE_BUTTON_TEXT}
                </DialogButton>

                <DialogButton onClick={onClickPositiveButton}>
                    {positiveButtonText}
                </DialogButton>
            </div>
        </div>
    )
}
