import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

function createWindow() {
    const window = new BrowserWindow({
        fullscreen: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    })

    window.loadFile(path.resolve(__dirname, '../index.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('minimise', () => {
    BrowserWindow.getFocusedWindow()?.minimize()
})

ipcMain.on('close', () => {
    BrowserWindow.getFocusedWindow()?.close()
})
