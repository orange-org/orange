import { app, BrowserWindow, globalShortcut } from "electron";
import { join } from "path";
import { installExtensions } from "main/installExtensions";
import { isDevelopment } from "main/isDevelopment";
import { performFinishLoadSetup } from "main/performFinishLoadSetup";
import { preventNetworkAndResourceRequests } from "main/preventNetworkAndResourceRequests";
import { preventNewWebViewsAndWindows } from "main/preventNewWebViewsAndWindows";
import { getAppRoot } from "main/getAppRoot";

app.enableSandbox();

let mainWindow: BrowserWindow;

function createWindow() {
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

      preload: join(__dirname, "preload.js"),
    },

    center: true,
    title: "Orange",
    minWidth: 800,
    minHeight: 600,
  });

  preventNetworkAndResourceRequests(mainWindow);

  mainWindow.loadFile(join(getAppRoot(), "renderer", "index.html"));

  mainWindow.webContents.once("did-finish-load", () => {
    performFinishLoadSetup(mainWindow, app);
  });

  if (isDevelopment) {
    mainWindow.maximize();
    mainWindow.webContents.openDevTools();
  } else {
    globalShortcut.register("CmdOrCtrl+R", () => null);
  }
}

// Disable web view creation
app.on("web-contents-created", preventNewWebViewsAndWindows);

app.on("ready", createWindow);
