var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var BrowserWindow = remote.require('browser-window');

var menu = new Menu();
menu.append(new MenuItem({ label: 'Dev Tools', click: function() {
  BrowserWindow.getFocusedWindow().toggleDevTools(); } }));

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);
