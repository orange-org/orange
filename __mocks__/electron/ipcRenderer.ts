/* eslint-disable import/no-mutable-exports */
import { EventEmitter } from "events";

class IpcRenderer extends EventEmitter {}

let ipcRenderer = new IpcRenderer();

export const resetIpcRenderer = () => {
  ipcRenderer = new IpcRenderer();
};

export { ipcRenderer };
