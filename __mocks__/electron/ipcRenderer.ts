import { EventEmitter } from "events";
import { ipcMain } from "./ipcMain";

class IpcRenderer extends EventEmitter {
  send = (name: string, ...args: any[]) => ipcMain.emit(name, {}, ...args);
}

export const ipcRenderer = new IpcRenderer();

export const resetIpcRenderer = () => {
  ipcRenderer.removeAllListeners();
};
