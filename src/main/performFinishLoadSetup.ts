import { BrowserWindow, App } from "electron";
import { bitcoindManager } from "_m/bitcoindManager";
import { registerIpcListener } from "_m/registerIpcListener";

// This must not be called more than once
export function performFinishLoadSetup(mainWindow: BrowserWindow, app: App) {
  const bitcoindProcess = bitcoindManager.startProcess(mainWindow);

  bitcoindProcess.on("exit", () => {
    app.quit();
  });

  registerIpcListener(mainWindow);

  app.on("before-quit", event => {
    if (bitcoindManager.isProcessRunning) {
      event.preventDefault();
      bitcoindProcess.kill();
    }
  });
}
