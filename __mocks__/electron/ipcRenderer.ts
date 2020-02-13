import { EventEmitter } from "events";

class IpcRenderer extends EventEmitter {}

export const ipcRenderer = new IpcRenderer();

export const resetIpcRenderer = () => {
  ipcRenderer.removeAllListeners();
};
