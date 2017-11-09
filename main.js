const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const fs = require('fs');

const proxy = require('express-http-proxy');
const express = require('express');
const server = express();

server.use(express.static(path.resolve(__dirname, './app')))
// server.use('/pi/*', proxy('http://127.0.0.1:9001', {
server.use('/pi/*', proxy('http://pi.awkint.com/', {
  proxyReqPathResolver: function(req) {
    // console.log('req.url', req.url);
    // return require('url').parse(req.url).path;
    return req.baseUrl;
  }
}))


const PORT = 9000;
const hostname = "127.0.0.1";
server.listen(PORT, hostname, function () {
  console.log(`server listening at http://${hostname}:${PORT}`);
})


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   nodeIntegration: false
    // }
  })

  // and load the index.html of the app.
  // win.loadURL("http://106.14.18.216/")

  // Or load a local HTML file
  // win.loadURL(`file://${__dirname}/app/index.html`)
  win.loadURL(`http://${hostname}:${PORT}/index.html`)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
