import { ipcRenderer, IpcRendererEvent } from "electron";
import { MessageToRenderer, MessageToMain } from "_t/IpcMessages";

export class Preload {
  isStarted = false;

  private isMessageFromRenderer = (data: any): data is MessageToMain =>
    data.source === "@orange/renderer";

  private handleWindowMessage = (event: MessageEvent) => {
    const { data, source } = event;

    /* istanbul ignore else */
    if (this.isMessageFromRenderer(data) && data.nonce === __NONCE__) {
      ipcRenderer.send("message-to-main", data, (source as any).name);
    }
  };

  private handleMessageToRenderer = (
    _event: IpcRendererEvent,
    data: MessageToRenderer,
  ) => {
    window.postMessage(data, "*");
  };

  start = () => {
    /* istanbul ignore if */
    if (this.isStarted) {
      throw new Error(
        "`startPreloadProcess` is meant to be called only once per Node.js process",
      );
    }

    this.isStarted = true;

    ipcRenderer.on("message-to-renderer", this.handleMessageToRenderer);
    window.addEventListener("message", this.handleWindowMessage);
  };
}

/* istanbul ignore if */
if (process.env.NODE_ENV !== "test") {
  const preload = new Preload();

  preload.start();
}
