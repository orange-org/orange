import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { productName } from "_m/../../package.json";
import { Utils } from "_m/common/Utils";
import { UrlGuard } from "./UrlGuard/UrlGuard";

export abstract class OrangeWindow extends BrowserWindow {
  constructor(
    browserWindowConstructorOptions: BrowserWindowConstructorOptions,
  ) {
    const { webPreferences, ...rest } = browserWindowConstructorOptions;

    super({
      webPreferences: {
        ...webPreferences,

        // The below configurations are set to achieve the maximum
        // security possible in an Electron renderer process
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
      title: productName,
      center: true,
      ...rest,
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

    this.loadFile(`${Utils.getAppRoot()}/renderer/index.html`);
  }
}
