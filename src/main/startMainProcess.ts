import { app, BrowserWindow, globalShortcut } from "electron";
import { installExtensions } from "_m/installExtensions";
import { isDevelopment } from "_m/isDevelopment";
import { preventNetworkAndResourceRequests } from "_m/preventNetworkAndResourceRequests";
import { preventNewWebViewsAndWindows } from "_m/preventNewWebViewsAndWindows";
import { registerIpcListener } from "./registerIpcListener";
import { processes } from "./processes";

export const startMainProcess = () => {
  app.enableSandbox();

  let mainWindow: BrowserWindow;

  function createWindow() {
    /* istanbul ignore if */
    if (isDevelopment) {
      installExtensions();
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
      title: "Orange",
      minWidth: 800,
      minHeight: 600,
      // frame: false,
    });

    preventNetworkAndResourceRequests(mainWindow);

    mainWindow.loadFile(processes.renderer);

    mainWindow.webContents.once("did-finish-load", () => {
      registerIpcListener(mainWindow);
    });

    /* istanbul ignore if */
    if (isDevelopment) {
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
