import { vol } from "memfs";
import { app, BrowserWindow } from "__mocks__/electron";
import { DEFAULT_SERVER_URL } from "_c/constants";
// import { startMainProcess } from "../main/startMainProcess";
import { Main } from "_m/main";
import { startPreloadProcess } from "../main/startPreloadProcess";

export const USERNAME = "__cookie__";
export const PASSWORD = "1337";
export const SERVER_URL = DEFAULT_SERVER_URL;

export const initializeElectronCode = (
  options: {
    skipInitializingFilesystem?: boolean;
  } = {},
) => {
  const main = new Main();
  main.start();
  // startMainProcess();
  startPreloadProcess();

  app.emit("ready");

  const { value: mainWindow } = BrowserWindow.instances.find(
    instance => instance.name === "Orange",
  )!;

  mainWindow.webContents.emit("did-finish-load");

  if (!options.skipInitializingFilesystem) {
    vol.fromJSON({
      "/home/.bitcoin/bitcoin.conf": "",
      "/home/.bitcoin/.cookie": `${USERNAME}:${PASSWORD}`,
    });
  }

  return mainWindow;
};
