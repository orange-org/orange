import { app } from "./app";
import { BrowserWindow } from "./BrowserWindow";
import { dialog } from "./dialog";
import { ipcMain } from "./ipcMain";
import { ipcRenderer } from "./ipcRenderer";
import { WebContents } from "./WebContents";

const globalShortcut = {
  register: () => null,
};

export {
  app,
  BrowserWindow,
  globalShortcut,
  WebContents,
  ipcMain,
  ipcRenderer,
  dialog,
};
