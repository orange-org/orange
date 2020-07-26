import { vol } from "memfs";
import { app, BrowserWindow } from "__mocks__/electron";
import { DEFAULT_SERVER_URL } from "_r/common/constants";
import { Main } from "_m/main";
import { Preload } from "_m/preload";

export class MockElectron {
  static USERNAME = "__cookie__";

  static PASSWORD = "1337";

  static SERVER_URL = DEFAULT_SERVER_URL;

  static start = (
    options: {
      skipInitializingFilesystem?: boolean;
    } = {},
  ) => {
    const main = new Main();
    main.start();

    const preload = new Preload();
    preload.start();

    app.emit("ready");

    const { value: mainWindow } = BrowserWindow.instances.find(
      instance => instance.name === "Orange",
    )!;

    mainWindow.webContents.emit("did-finish-load");

    if (!options.skipInitializingFilesystem) {
      vol.fromJSON({
        "/home/.bitcoin/bitcoin.conf": "",
        "/home/.bitcoin/.cookie": `${MockElectron.USERNAME}:${MockElectron.PASSWORD}`,
      });
    }

    return mainWindow;
  };
}
