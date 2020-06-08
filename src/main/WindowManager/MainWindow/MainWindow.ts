import { globalShortcut } from "electron";
import { Utils } from "_m/common/Utils";
import { OrangeWindow } from "../common/OrangeWindow";

export class MainWindow extends OrangeWindow {
  load() {
    this.loadFile(`${Utils.getAppRoot()}/renderer/index.html`);
  }

  constructor() {
    super({
      minWidth: 800,
      minHeight: 600,
      width: 1000,
      height: 800,
    });

    /* istanbul ignore next */
    this.webContents.once("did-frame-finish-load", () => {
      if (Utils.isDevelopment()) {
        this.maximize();
        this.webContents.openDevTools();
      } else {
        globalShortcut.register("CmdOrCtrl+R", () => null);
      }
    });
  }
}
