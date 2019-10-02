const {
    app, globalShortcut, BrowserWindow, ipcMain
} = require('electron');

const min_width = 800;
const min_height = 600;
let default_width = 1280;
let default_height = 720;
let showDevTools = false;

let main_window;
const createWindow = function() {
    main_window = new BrowserWindow({
        width: default_width,
        height: default_height,
        frame: false,
        transparent: true
    });
    main_window.loadURL(`file://${__dirname}/index.html`);
    main_window.setMinimumSize(min_width, min_height);
    main_window.on('closed', () => {
        main_window = null;
    });
    main_window.on('resize',() => {
        console.warn(`on resize `);
        main_window.setAspectRatio(default_width/default_height);
    });
};

const registerShortcut = function(){
    globalShortcut.register('CmdOrCtrl+F12', () => {
        console.warn(`shortcut: CmdOrCtrl+F12`);
        (showDevTools = !showDevTools)?
            main_window.webContents.openDevTools() : 
            main_window.webContents.closeDevTools();
    })
}

app.on('ready', () => {
    createWindow();
    registerShortcut();
});
app.on('window-all-closed', () => {
    main_window = null;
});
app.on('activate', () => {
    if(main_window === null){
        createWindow();
    }
});

ipcMain.on('resetWindowSize', (event, size) => {
    console.warn(`resetWindowSize: ${JSON.stringify(size)}`);
    default_width = size.width;
    default_height = size.height;
    main_window.setSize(size.width, size.height);
});
ipcMain.on('toggleFullScreenState', () => {
    console.warn(`toggleFullScreenState:`);
    {
        if(main_window.isFullScreen()) {
            main_window.setFullScreen(false);
        } else {
            main_window.setFullScreen(true);
        }
    }
});
ipcMain.on('ondragstart', (event, filePath) => {
    console.warn(`ondragstart: ${filePath}`);
    event.sender.startDrag({
      file: filePath,
      icon: '/png/add.png'
    })
  })
