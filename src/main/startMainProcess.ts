import { app, globalShortcut } from "electron";
import { getIsDevelopment } from "_m/getIsDevelopment";
import { preventNetworkAndResourceRequests } from "_m/preventNetworkAndResourceRequests";
import { preventNewWebViewsAndWindows } from "_m/preventNewWebViewsAndWindows";
import { getStore } from "./getStore";
import { handleSquirrelEvents } from "./handleSquirrelEvents";
import { getMainWindow } from "./getMainWindow";
import { parseCommandLineArgs } from "./parseCommandLineArgs";
import { processes } from "./processes";
import { registerIpcListener } from "./registerIpcListener";
import { registerErrorHandling } from "./registerErrorHandling";

export const startMainProcess = () => {
  registerErrorHandling();

  app.enableSandbox();

  const store = getStore();
  store.args = parseCommandLineArgs();

  function createWindow() {
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

    /* istanbul ignore if */
    if (getIsDevelopment()) {
      mainWindow.maximize();
      mainWindow.webContents.openDevTools();
    } else {
      globalShortcut.register(
        "CmdOrCtrl+R",
        /* istanbul ignore next */ () => null,
      );
    }
  }

  // Disable web view creation
  app.on("web-contents-created", preventNewWebViewsAndWindows);
  app.on("ready", createWindow);
};
