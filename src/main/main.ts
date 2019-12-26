/* eslint-disable @typescript-eslint/no-unused-vars */
import { app, BrowserWindow, systemPreferences } from "electron";
import { join } from "path";
import { createInterface } from "readline";
import { startBitcoind } from "./start-bitcoind";
import { installExtensions } from "./install-extensions";

app.enableSandbox();

let mainWindow: BrowserWindow | null;

function createWindow() {
  installExtensions();

  mainWindow = new BrowserWindow({
    center: true,
    title: "Orange",
    webPreferences: {
      // The below configurations are set to achieve the maximum
      // security possible in Electron
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      nodeIntegrationInSubFrames: false,
      nodeIntegrationInWorker: false,
      allowRunningInsecureContent: false,
      sandbox: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  // This prevents Electron from making any network requests to the outside
  // world.
  // mainWindow.webContents.session.webRequest.onBeforeRequest(
  //   (details, response) => {
  //     response({ cancel: !isWhitelistedUrl(detials.url) });
  //   },
  // );

  // process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";
  mainWindow.loadURL(`http://localhost:2003`);

  mainWindow.webContents.on("did-finish-load", () => {
    if (!mainWindow) return;

    mainWindow.webContents.send("message-from-main", {
      type: "system-preference",
      message: {
        colorWindowBackground: systemPreferences.getColor("window-background"),
      },
    });

    // const bitcoindProcess = startBitcoind();
    // createInterface({ input: bitcoindProcess.stdout }).on("line", line => {
    //   if (!mainWindow) return;
    //   console.log(line);
    //   mainWindow.webContents.send("message-from-main", {
    //     type: "bitcoind-line",
    //     message: line,
    //   });
    // });

    // createInterface({ input: bitcoindProcess.stderr }).on("line", line => {
    //   console.log(line);
    // });
  });

  // // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
