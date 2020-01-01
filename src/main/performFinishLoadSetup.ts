import { BrowserWindow, App } from "electron";
import { bitcoindManager } from "main/bitcoindManager";
import { registerRpcRequestListener } from "main/sendRpcRequestToBitcoind";

export function performFinishLoadSetup(mainWindow: BrowserWindow, app: App) {
  let quitAttempted = false;

  const bitcoindProcess = bitcoindManager.startProcess(mainWindow);

  bitcoindProcess.on("exit", () => {
    if (quitAttempted) {
      app.quit();
    }
  });

  registerRpcRequestListener(mainWindow);

  app.on("before-quit", event => {
    quitAttempted = true;

    if (bitcoindManager.isProcessRunning) {
      event.preventDefault();
      bitcoindProcess.kill();
    }
  });
}
