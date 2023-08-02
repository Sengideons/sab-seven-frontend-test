const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

let win;

function createWindow() {
  win = new BrowserWindow({
    width 800,
    height 600,
    webPreferences {
      nodeIntegration true
    }
  });

  win.loadURL(url.format({
    pathname path.join(__dirname, 'build', 'index.html'),
    protocol 'file',
    slashes true
  }));

  win.on('closed', () = {
    win = null;
  });

   Start the JSON server
  server.listen(3001, () = {
    console.log('JSON Server is running');
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () = {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () = {
  if (win === null) {
    createWindow();
  }
});
