import { app } from "./app";
import { BrowserWindow, WebContents } from "./BrowserWindow";
import { ipcMain } from "./ipcMain";

const globalShortcut = {
  register: () => null,
};

export { app, BrowserWindow, globalShortcut, WebContents, ipcMain };
