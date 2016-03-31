var fs = require('fs');
var path = require('path');
var electron = require('electron');
var app = electron.app;
var ipcMain = electron.ipcMain;
var BrowserWindow = electron.BrowserWindow;
var windowStateKeeper = require('electron-window-state');

var os = require('os');
var platform = os.platform() + '_' + os.arch();
var version = app.getVersion();
var releaseUrl = 'https://tox-wbc-mgr-app-nuts.herokuapp.com/update/' + platform + '/' + version;

var mainWindow = null;

app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {
  var mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Mein Title - deng', // ToDo überschreibt den Titel aus der index.html - vllt. brauht man das noch
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    center: true,
    show: true,
    frame: true,
    autoHideMenuBar: true,
    //icon: 'assets/icon.png',
    titleBarStyle: 'hidden-inset'
  });

  mainWindowState.manage(mainWindow);
  mainWindow.loadURL(path.normalize('file://' + path.join(__dirname, 'index.html')));

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools({detach: true});
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', function () {
    ipcMain.on('get-release-url', function () {
      mainWindow.webContents.send('send-release-url', releaseUrl);
    });
    ipcMain.on('get-os-data', function () {
      mainWindow.webContents.send('send-os-data', getOsData());
    });
    ipcMain.on('get-node-env', function () {
      mainWindow.webContents.send('send-node-env', process.env.NODE_ENV);
    });
  });
});


// current helper to get os-Data into angular ...
function getOsData() {
  return {
    arch: os.arch(),
    cpus: os.cpus(),
    endianness: os.endianness(),
    freemem: os.freemem(),
    homedir: os.homedir(),
    hostname: os.hostname(),
    loadavg: os.loadavg(),
    networkInterfaces: os.networkInterfaces(),
    platform: os.platform(),
    release: os.release(),
    tmpdir: os.tmpdir(),
    totalmem: os.totalmem(),
    type: os.type(),
    uptime: os.uptime()
  };
}