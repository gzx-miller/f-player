const {
    app, globalShortcut, BrowserWindow, ipcMain, ipcRenderer
} = require('electron');

const min_width = 640;
const min_height = 480;
let default_width = 1080;
let default_height = 400;

let main_window;
const createWindow = function() {
    main_window = new BrowserWindow({
        width: default_width,
        height: default_height,
        frame: true,
        titleBarStyle: 'customButtonsOnHover',
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
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
    main_window.webContents.openDevTools();
};

const registerShortcut = function(){
    globalShortcut.register('CmdOrCtrl+W', () => {
        console.warn(`shortcut: CmdOrCtrl+W`);
    })
}

app.on('ready', () => {
    createWindow();
    registerShortcut();
});
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
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
