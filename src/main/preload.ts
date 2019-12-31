import { ipcRenderer } from "electron";
import { MessageFromMain, MessageFromRenderer } from "typings/types";

ipcRenderer.on("message-from-main", (_event, data: MessageFromMain<any>) => {
  window.postMessage(data, "*");
});

function isMessageFromRenderer(data: any): data is MessageFromRenderer<any> {
  return data.source === "@orange/renderer";
}

window.addEventListener("message", event => {
  const { data } = event;

  if (isMessageFromRenderer(data) && data.nonce === "__NONCE__") {
    ipcRenderer.send("message-from-renderer", event.data);
  }
});
