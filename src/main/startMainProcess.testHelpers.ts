import { vol } from "memfs";
import nock from "nock";
import { app, BrowserWindow } from "__mocks__/electron";
import { startMainProcess } from "./startMainProcess";
import { startPreloadProcess } from "./startPreloadProcess";

export const USERNAME = "__cookie__";
export const PASSWORD = "1337";
export const SERVER_URL = "http://localhost:8332";

export const initializeElectronCode = (setupServer = true) => {
  startMainProcess();
  startPreloadProcess();

  app.emit("ready");

  const { value: mainWindow } = BrowserWindow.instances.find(
    instance => instance.name === "Orange",
  )!;

  mainWindow.webContents.emit("did-finish-load");

  vol.fromJSON({
    "home/.bitcoin/bitcoin.conf": "",
    "home/.bitcoin/.cookie": `${USERNAME}:${PASSWORD}`,
  });

  if (setupServer) {
    nock(SERVER_URL)
      .post("/")
      .reply(200, {});
  }

  return mainWindow;
};
