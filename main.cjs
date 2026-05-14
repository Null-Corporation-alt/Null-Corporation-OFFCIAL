const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Null Corporation',
    backgroundColor: '#000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    // Estética hacker: quitar bordes si prefieres (opcional)
    // frame: false, 
  });

  if (isDev) {
    // En desarrollo, cargamos el servidor de Vite
    mainWindow.loadURL('http://localhost:5173');
    // Abrir herramientas de desarrollo automáticamente
    mainWindow.webContents.openDevTools();
  } else {
    // En producción, cargamos el archivo compilado
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
