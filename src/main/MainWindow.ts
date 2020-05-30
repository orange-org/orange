import { BrowserWindow, globalShortcut } from "electron";
import { productName } from "_m/../../package.json";
import { getIsDevelopment } from "./getIsDevelopment";
import { isWhitelistedUrl } from "./isWhitelistedUrl/isWhitelistedUrl";
import { registerIpcListener } from "./registerIpcListeners/registerIpcListeners";
import { processes } from "./processes";

export class MainWindow extends BrowserWindow {
  constructor() {
    super({
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

    /**
     * This prevents Electron from making any network requests to the outside
     * world. It also prevents loading any content from a non-whitelisted
     * domain. This provides redundancy to the content security policy set on
     * the `renderer` process
     */
    this.webContents.session.webRequest.onBeforeRequest((details, response) => {
      response({ cancel: !isWhitelistedUrl(details.url) });
    });

    this.webContents.once("did-finish-load", registerIpcListener);

    /* istanbul ignore next */
    this.webContents.once("did-frame-finish-load", () => {
      if (getIsDevelopment()) {
        this.maximize();
        this.webContents.openDevTools();
      } else {
        globalShortcut.register("CmdOrCtrl+R", () => null);
      }
    });

    this.loadFile(processes.renderer);
  }
}
