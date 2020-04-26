/* eslint-disable max-classes-per-file */
import { EventEmitter } from "events";
import { ipcRenderer } from "./ipcRenderer";

type Listener = (...args: any[]) => void;
class WebRequest extends EventEmitter {
  onBeforeRequest = (listener: Listener) => this.on("before-request", listener);
}

export class WebContents extends EventEmitter {
  session = {
    webRequest: new WebRequest(),
  };

  send = (name: string, data: any) => ipcRenderer.emit(name, {}, data);
}
