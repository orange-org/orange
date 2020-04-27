import { BrowserWindowConstructorOptions } from "electron";
import { deleteMainWindow } from "_m/getMainWindow";
import { WebContents } from "./WebContents";

export class BrowserWindow {
  static instances: { name: string; value: BrowserWindow }[] = [];

  webContents = new WebContents();

  constructor(options: BrowserWindowConstructorOptions) {
    BrowserWindow.instances.push({ name: options.title!, value: this });
  }

  loadFile = () => null;

  isDestroyed = () => false;
}

export const resetBrowserWindow = () => {
  deleteMainWindow();
  BrowserWindow.instances = [];
};
