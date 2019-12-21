import { app, BrowserWindow, systemPreferences } from "electron";
import { createInterface } from "readline";
import { installExtensions } from "./install-extensions";
import { startBitcoind } from "./start-bitcoind";
// import { join } from "path";

let mainWindow: BrowserWindow;

// const bitcoindProcess = startBitcoind();

function createWindow() {
  installExtensions();

  mainWindow = new BrowserWindow({
    center: true,
    title: "Orange",
    webPreferences: { nodeIntegration: true },
  });

  // mainWindow.loadURL(
  //   format({
  //     pathname: join(__dirname, "index.html"),
  //     protocol: "file:",
  //     slashes: true,
  //   }),
  // );

  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";
  mainWindow.loadURL(`http://localhost:2003`);

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("system-preference", {
      colorWindowBackground: systemPreferences.getColor("window-background"),
    });

    // createInterface({ input: bitcoindProcess.stdout }).on("line", line => {
    //   // console.log(line);
    //   mainWindow.webContents.send("bitcoind-line", line);
    // });
  });
  // Create the browser window.
  // mainWindow = new BrowserWindow({
  //   height: 600,
  //   webPreferences: {
  //     preload: path.join(__dirname, 'preload.js'),
  //   },
  //   width: 800,
  // });

  // // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // // Open the DevTools.
  // // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // mainWindow = null;
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
