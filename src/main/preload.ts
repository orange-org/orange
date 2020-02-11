import { ipcRenderer } from "electron";
import { MessageToRenderer, MessageToMain } from "_t/IpcMessages";

ipcRenderer.on("message-to-renderer", (_event, data: MessageToRenderer) => {
  window.postMessage(data, "*");
});

function isMessageFromRenderer(data: any): data is MessageToMain {
  return data.source === "@orange/renderer";
}

window.addEventListener("message", event => {
  const { data } = event;

  if (isMessageFromRenderer(data) && data.nonce === __NONCE__) {
    ipcRenderer.send("message-to-main", data);
  }
});
