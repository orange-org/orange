import { BrowserWindow, App } from "electron";
import { bitcoindManager } from "_m/bitcoindManager";
import { registerIpcListener } from "_m/registerIpcListener";

export function performFinishLoadSetup(mainWindow: BrowserWindow, app: App) {
  let quitAttempted = false;

  const bitcoindProcess = bitcoindManager.startProcess(mainWindow);

  bitcoindProcess.on("exit", () => {
    if (quitAttempted) {
      app.quit();
    }
  });

  registerIpcListener(mainWindow);

  app.on("before-quit", event => {
    quitAttempted = true;

    if (bitcoindManager.isProcessRunning) {
      event.preventDefault();
      bitcoindProcess.kill();
    }
  });
}
