import { MessageToRenderer } from "typings/types";
import { BrowserWindow } from "electron";

export function sendMessageToRenderer<MessageType>(
  payload: Omit<MessageToRenderer<MessageType>, "source">,
  mainWindow: BrowserWindow,
) {
  if (!mainWindow.isDestroyed()) {
    mainWindow.webContents.send("message-to-renderer", {
      source: "@orange/main",
      ...payload,
    });
  }
}
