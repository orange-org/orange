import { MessageToRenderer } from "_t/IpcMessages";
import { BrowserWindow } from "electron";

export function callRenderer(
  payload: Omit<MessageToRenderer, "source">,
  mainWindow: BrowserWindow,
) {
  /* istanbul ignore else */
  if (!mainWindow.isDestroyed()) {
    mainWindow.webContents.send("message-to-renderer", {
      source: "@orange/main",
      ...payload,
    });
  }
}
