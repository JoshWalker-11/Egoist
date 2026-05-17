const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  readData: () => ipcRenderer.invoke('read-data'),
  writeData: (data) => ipcRenderer.invoke('write-data', data),
  saveImage: (filename, base64Data) =>
    ipcRenderer.invoke('save-image', { filename, base64Data }),
  getImage: (imagePath) => ipcRenderer.invoke('get-image', imagePath),
});
