import { BrowserWindow, globalShortcut, ipcMain } from "electron";
import { productName } from "_m/../../package.json";
import { Utils } from "_m/common/Utils";
import { SendableMessageToMain } from "_t/IpcMessages";
import { UrlGuard } from "./UrlGuard/UrlGuard";
import { ErrorDialog } from "../../common/ErrorDialog";
import { RpcRequestIpcEvent } from "./RpcRequestIpcEvent/RpcRequestIpcEvent";

export class MainWindow extends BrowserWindow {
  private registerIpcListener = () => {
    ipcMain.on(
      "message-to-main",
      async (_event, data: SendableMessageToMain) => {
        if (data.type === "rpc-request") {
          await RpcRequestIpcEvent.handle(data);
        } else if (data.type === "show-error") {
          await ErrorDialog.show(data.payload);
        }
      },
    );
  };

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
      response({ cancel: !UrlGuard.isAllowed(details.url) });
    });

    this.webContents.once("did-finish-load", this.registerIpcListener);

    /* istanbul ignore next */
    this.webContents.once("did-frame-finish-load", () => {
      if (Utils.isDevelopment()) {
        this.maximize();
        this.webContents.openDevTools();
      } else {
        globalShortcut.register("CmdOrCtrl+R", () => null);
      }
    });

    this.loadFile(`${Utils.getAppRoot()}/renderer/index.html`);
  }
}
