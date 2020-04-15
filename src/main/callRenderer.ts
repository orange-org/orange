import { MessageToRenderer } from "_t/IpcMessages";
import { mainWindow } from "./mainWindow";

export function callRenderer(payload: Omit<MessageToRenderer, "source">) {
  /* istanbul ignore else */
  if (!mainWindow.isDestroyed()) {
    mainWindow.webContents.send("message-to-renderer", {
      source: "@orange/main",
      ...payload,
    });
  }
}
