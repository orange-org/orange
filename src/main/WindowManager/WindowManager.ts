import { SendableMessageToRenderer } from "_t/IpcMessages";
import { MainWindow } from "./MainWindow/MainWindow";
import { StartWindow } from "./StartWindow/StartWindow";

class WindowManager {
  private mainWindow: MainWindow | null = null;

  private startWindow: StartWindow | null = null;

  // private closeWindow: CloseWindow | null = null;

  getMainWindow = () => {
    if (!this.mainWindow) {
      this.mainWindow = new MainWindow();
    }

    return this.mainWindow;
  };

  createMainWindow = this.getMainWindow;

  getStartWindow = () => {
    if (!this.startWindow) {
      this.startWindow = new StartWindow();
    }

    return this.startWindow;
  };

  createStartWindow = this.getStartWindow;

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
