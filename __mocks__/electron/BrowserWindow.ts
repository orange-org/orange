import { BrowserWindowConstructorOptions } from "electron";
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
