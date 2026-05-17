const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');

let mainWindow;

const getDataDir = () => {
  const dataDir = path.join(process.env.APPDATA || process.env.HOME, '.egoist');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('read-data', async () => {
  const dataDir = getDataDir();
  const dataFile = path.join(dataDir, 'data.json');
  
  if (fs.existsSync(dataFile)) {
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  }
  return { players: [] };
});

ipcMain.handle('write-data', async (event, data) => {
  const dataDir = getDataDir();
  const dataFile = path.join(dataDir, 'data.json');
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  return true;
});

ipcMain.handle('save-image', async (event, { filename, base64Data }) => {
  const dataDir = getDataDir();
  const imagesDir = path.join(dataDir, 'images');
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  const imagePath = path.join(imagesDir, filename);
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(imagePath, buffer);
  return imagePath;
});

ipcMain.handle('get-image', async (event, imagePath) => {
  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    return 'data:image/png;base64,' + imageBuffer.toString('base64');
  }
  return null;
});
