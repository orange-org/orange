import { ipcRenderer } from "electron";
import { MessageToRenderer, MessageToMain } from "_t/IpcMessages";

export const startPreloadProcess = () => {
  ipcRenderer.on("message-to-renderer", (_event, data: MessageToRenderer) => {
    window.postMessage(data, "*");
  });

  function isMessageFromRenderer(data: any): data is MessageToMain {
    return data.source === "@orange/renderer";
  }

  const messageEventListener = (event: MessageEvent) => {
    const { data } = event;

    /* istanbul ignore else */
    if (isMessageFromRenderer(data) && data.nonce === __NONCE__) {
      ipcRenderer.send("message-to-main", data);
    }
  };
  window.addEventListener("message", messageEventListener);

  // This is to clean up after each test.
  // See https://github.com/orange-org/orange/issues/25
  return () => window.removeEventListener("message", messageEventListener);
};
