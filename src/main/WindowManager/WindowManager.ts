import { SendableMessageToRenderer } from "_t/IpcMessages";
import { MainWindow } from "./MainWindow/MainWindow";

class WindowManager {
  private mainWindow: MainWindow | null = null;

  getMainWindow = () => {
    if (!this.mainWindow) {
      this.mainWindow = new MainWindow();
    }

    return this.mainWindow;
  };

  createMainWindow = this.getMainWindow;

  sendMessageToMainWindow = (
    payload: Omit<SendableMessageToRenderer, "source">,
  ) => {
    /* istanbul ignore else */
    if (!this.mainWindow?.isDestroyed()) {
      this.mainWindow?.webContents.send("message-to-renderer", {
        source: "@orange/main",
        ...payload,
      });
    }
  };
}

export const windowManager = new WindowManager();
