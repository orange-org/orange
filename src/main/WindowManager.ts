import { MainWindow } from "./MainWindow";

class WindowManager {
  mainWindow: MainWindow | null = null;

  getMainWindow = () => {
    if (!this.mainWindow) {
      this.mainWindow = new MainWindow();
    }

    return this.mainWindow;
  };

  createMainWindow = this.getMainWindow;
}

export const windowManager = new WindowManager();
