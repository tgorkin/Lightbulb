var app = require('app');
var BrowserWindow = require('browser-window');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// Initializes the app 
app.on('ready', function() {
  // Create the browser window.

  mainWindow = new BrowserWindow({
    "width": 1010,
    "height": 700,
    "min-width": 1010,
    "min-height": 700,
    "use-content-size": true
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});
