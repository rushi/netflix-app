const electron = require('electron');
const app = electron.app;
const {BrowserWindow, Tray, nativeImage} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    let image = nativeImage.createFromPath(__dirname + '/assets/icon.png');
    app.dock.setIcon(image);

    mainWindow = new BrowserWindow({
        'icon': image,
        'title': 'Netflix Wrapper',
        'height': 600,
        'width': 800,
        'resizable': true,
        'show': false,
        'titleBarStyle': 'hidden',
        'backgroundColor': '#141414'
    });
    mainWindow.loadURL("file://" + __dirname + '/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.maximize();
    });

    mainWindow.on('focus', () => {
        mainWindow.webContents.send('focus', 'OMG HI FOCUS');
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the dock icon is clicked & there are no other windows open
    if (mainWindow === null) {
        createWindow()
    }
});

app.commandLine.appendSwitch('widevine-cdm-path',  __dirname + '/plugins/widevinecdmadapter.plugin');
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903');
