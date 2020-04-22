import { MessageToRenderer, SendableMessageToRenderer } from "_t/IpcMessages";
import { getMainWindow } from "./getMainWindow";

export const callRenderer = (payload: Omit<MessageToRenderer, "source">) => {
  const mainWindow = getMainWindow();

  /* istanbul ignore else */
  if (!mainWindow.isDestroyed()) {
    mainWindow.webContents.send("message-to-renderer", {
      source: "@orange/main",
      ...payload,
    });
  }
};

export const respondToRenderer = (
  payload: Omit<SendableMessageToRenderer, "source">,
) => {
  const mainWindow = getMainWindow();

  /* istanbul ignore else */
  if (!mainWindow.isDestroyed()) {
    mainWindow.webContents.send("message-to-renderer", {
      source: "@orange/main",
      ...payload,
    });
  }
};
