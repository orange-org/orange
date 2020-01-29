import { MessageToRenderer } from "typings/IpcMessages";
import { BrowserWindow } from "electron";

export function sendMessageToRenderer(
  payload: Omit<MessageToRenderer, "source">,
  mainWindow: BrowserWindow,
) {
  if (!mainWindow.isDestroyed()) {
    mainWindow.webContents.send("message-to-renderer", {
      source: "@orange/main",
      ...payload,
    });
  }
}
