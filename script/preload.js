const {contextBridge, ipcRenderer, dialog} = require("electron");

window.selectInput = function(){
  dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
}

contextBridge.exposeInMainWorld("electron", {
  selectInput: () => {
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
  }
})
