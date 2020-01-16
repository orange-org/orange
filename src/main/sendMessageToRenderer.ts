import { MessageToRenderer } from "typings/IpcMessages";
import { BrowserWindow } from "electron";
import { OmitDistributed as DistributedOmit } from "_t/typeHelpers";

export function sendMessageToRenderer(
  payload: DistributedOmit<MessageToRenderer, "source">,
  mainWindow: BrowserWindow,
) {
  if (!mainWindow.isDestroyed()) {
    mainWindow.webContents.send("message-to-renderer", {
      source: "@orange/main",
      ...payload,
    });
  }
}
