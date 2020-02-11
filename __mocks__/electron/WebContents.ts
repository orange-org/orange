import { EventEmitter } from "events";
import { ipcRenderer } from "./ipcRenderer";

export class WebContents extends EventEmitter {
  session = {
    webRequest: {
      onBeforeRequest: (fn: Function) => null,
    },
  };

  send = ipcRenderer.emit;
}
