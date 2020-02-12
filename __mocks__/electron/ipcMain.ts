/* eslint-disable import/no-mutable-exports */
import { EventEmitter } from "events";

class IpcMain extends EventEmitter {}

let ipcMain = new IpcMain();

export const resetIpcMain = () => {
  ipcMain = new IpcMain();
};

export { ipcMain };
