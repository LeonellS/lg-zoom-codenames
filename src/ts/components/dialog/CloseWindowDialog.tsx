import { ipcRenderer } from 'electron'
import React from 'react'
import Dialog from './Dialog'

export default function () {
    function exitApp() {
        ipcRenderer.send('close')
    }

    return (
        <Dialog positiveButtonText="Exit" positiveButtonOnClick={exitApp}>
            Exit the application?
        </Dialog>
    )
}
