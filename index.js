const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const flattener = require("./script/flattener.js");

var inputFile, outputFile;

function createWindow () {
  const win = new BrowserWindow(
    {
      width: 400,
      height: 500,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableremotemodule: true,
      }
    }
  );

  win.loadFile('./views/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//reponses
ipcMain.handle("selectInput", async (event) => {
  return await dialog.showOpenDialogSync({ properties: ['openFile'] });
});
ipcMain.handle("selectOutput", async (event) => {
  return await dialog.showSaveDialogSync({ properties: ['openFile'] });
});

ipcMain.handle("flatten", async (event, input, output) => {
  console.log(input + " " + output);
  await flattener.flatten(input, output);
});
