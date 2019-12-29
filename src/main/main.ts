import { app, BrowserWindow } from "electron";
import { join } from "path";
import { installExtensions } from "main/installExtensions";
import { isDevelopment } from "main/isDevelopment";
import { performFinishLoadSetup } from "main/performFinishLoadSetup";
import { preventNetworkRequests } from "./preventNetworkRequests";
import { preventNewWebViewsAndWindows } from "./preventNewWebViewsAndWindows";

app.enableSandbox();

let mainWindow: BrowserWindow;

function createWindow() {
  if (isDevelopment) {
    installExtensions();
  }

  mainWindow = new BrowserWindow({
    center: true,
    title: "Orange",
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

      preload: join(__dirname, "preload.js"),
    },
  });

  preventNetworkRequests(mainWindow);

  mainWindow.loadFile(join(__dirname, "index.html"));

  mainWindow.webContents.on("did-finish-load", () => {
    performFinishLoadSetup(mainWindow);
  });

  // Open the DevTools.
  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }
}

// Disable web view creation
app.on("web-contents-created", preventNewWebViewsAndWindows);

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});
