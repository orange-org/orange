import { EventEmitter } from "events";

class IpcMain extends EventEmitter {}

export const ipcMain = new IpcMain();
