import { EventEmitter } from "events";
import { ipcMain } from "./ipcMain";

class IpcRenderer extends EventEmitter {
  send = (name: string, data: any) => ipcMain.emit(name, {}, data);
}

export const ipcRenderer = new IpcRenderer();
