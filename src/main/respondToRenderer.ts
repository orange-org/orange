import { SendableMessageToRenderer } from "_t/IpcMessages";
import { windowManager } from "./WindowManager";

export const respondToRenderer = (
  payload: Omit<SendableMessageToRenderer, "source">,
) => {
  const mainWindow = windowManager.getMainWindow();

  /* istanbul ignore else */
  if (!mainWindow.isDestroyed()) {
    mainWindow.webContents.send("message-to-renderer", {
      source: "@orange/main",
      ...payload,
    });
  }
};
