import { BrowserWindow } from "electron";
import { productName } from "../../package.json";

let mainWindow: BrowserWindow;

export const getMainWindow = () => {
  if (mainWindow) {
    return mainWindow;
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

  return mainWindow;
};
