const { app, BrowserWindow } = require('electron');

let mainWin;

function createWindow() {
    // Create the browser window.
    mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        backgroundColor: '#FFF',
        webPreferences: {
            contextIsolation: true
        }
    });

    // and load the index.html of the app.
    mainWin.loadFile('index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    // Show the mainwindow when it is loaded and ready to show
    mainWin.once('ready-to-show', () => {
        mainWin.show()
    })
    // Emitted when the window is closed.
    mainWin.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWin = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWin === null) {
        createWindow()
    }
})