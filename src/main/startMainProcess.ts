import { app, globalShortcut } from "electron";
import { getIsDevelopment } from "_m/getIsDevelopment";
import { preventNetworkAndResourceRequests } from "_m/preventNetworkAndResourceRequests";
import { preventNewWebViewsAndWindows } from "_m/preventNewWebViewsAndWindows";
import { getMainWindow } from "./getMainWindow";
import { handleSquirrelEvents } from "./handleSquirrelEvents";
import { processes } from "./processes";
import { registerErrorHandling } from "./registerErrorHandling";
import { registerIpcListener } from "./registerIpcListeners/registerIpcListeners";
import { startBtcd } from "./startBtcd";

let startMainProcessHasBeenCalled = false;

export const startMainProcess = () => {
  /* istanbul ignore if */
  if (startMainProcessHasBeenCalled) {
    throw new Error(
      "`startMainProcess` is meant to be called only once per Node.js process",
    );
  }

  startMainProcessHasBeenCalled = true;

  registerErrorHandling();

  app.enableSandbox();

  function createWindow() {
    startBtcd();

    const mainWindow = getMainWindow();

    /* istanbul ignore if: this is both hard to test and non-critical. */
    if (handleSquirrelEvents(app)) {
      return;
    }

    /* istanbul ignore if */
    if (getIsDevelopment()) {
      // eslint-disable-next-line global-require
      require("_m/installExtensions");
    }

    preventNetworkAndResourceRequests();

    mainWindow.loadFile(processes.renderer);

    mainWindow.webContents.once("did-finish-load", registerIpcListener);

    /* istanbul ignore next */
    mainWindow.webContents.once("did-frame-finish-load", () => {
      if (getIsDevelopment()) {
        mainWindow.maximize();
        mainWindow.webContents.openDevTools();
      } else {
        globalShortcut.register("CmdOrCtrl+R", () => null);
      }
    });
  }

  // Disable web view creation
  app.on("web-contents-created", preventNewWebViewsAndWindows);
  app.on("ready", createWindow);
};
