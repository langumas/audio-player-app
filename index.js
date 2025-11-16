const { app, BrowserWindow, ipcMain, dialog  } = require('electron')

const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
        width: 590,
        height: 300,
        frame: false,         
        resizable: false,    
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    })
    
    win.loadFile('index.html')

    win.setMenuBarVisibility(false)


    ipcMain.handle('dialog:openFile', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
            filters: [{ name: 'Audio Files', extensions: ['mp3'] }],
            properties: ['openFile']
        });
        if (canceled) {
            return null;
        } else {
            return filePaths[0];
        } 
    })
}

app.whenReady().then(() => {
    createWindow()
})