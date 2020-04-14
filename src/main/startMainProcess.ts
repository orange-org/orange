import { app, BrowserWindow, globalShortcut } from "electron";
import { getIsDevelopment } from "_m/getIsDevelopment";
import { preventNetworkAndResourceRequests } from "_m/preventNetworkAndResourceRequests";
import { preventNewWebViewsAndWindows } from "_m/preventNewWebViewsAndWindows";
import { registerIpcListener } from "./registerIpcListener";
import { processes } from "./processes";
import { getStore } from "./getStore";
import { parseCommandLineArgs } from "./parseCommandLineArgs";
import { handleSquirrelEvents } from "./handleSquirrelEvents";
import { productName } from "../../package.json";

export const startMainProcess = () => {
  app.enableSandbox();

  let mainWindow: BrowserWindow;

  const store = getStore();
  store.args = parseCommandLineArgs();

  function createWindow() {
    /* istanbul ignore if: this is both hard to test and non-critical. */
    if (handleSquirrelEvents(app)) {
      return;
    }

    /* istanbul ignore if */
    if (getIsDevelopment()) {
      // eslint-disable-next-line global-require
      require("_m/installExtensions");
    }

    mainWindow = new BrowserWindow({
      webPreferences: {
        // The below configurations are set to achieve the maximum
        // security possible in Electron
        contextIsolation: true,
        webSecurity: true,
        enableRemoteModule: false,
        nodeIntegration: false,
        nodeIntegrationInSubFrames: false,
        nodeIntegrationInWorker: false,
        allowRunningInsecureContent: false,
        sandbox: true,

        preload: `${__dirname}/preload.js`,
      },

      center: true,
      title: productName,
      minWidth: 800,
      minHeight: 600,
      width: 1000,
      height: 800,
    });

    preventNetworkAndResourceRequests(mainWindow);

    mainWindow.loadFile(processes.renderer);

    mainWindow.webContents.once("did-finish-load", () => {
      registerIpcListener(mainWindow);
    });

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
