const { contextBridge, ipcRenderer } = require('electron');

// Aquí puedes exponer funciones del sistema a tu web de React de forma segura
contextBridge.exposeInMainWorld('electronAPI', {
  // Ejemplo: una función para cerrar la app si haces un botón personalizado
  closeApp: () => ipcRenderer.send('close-app')
});
