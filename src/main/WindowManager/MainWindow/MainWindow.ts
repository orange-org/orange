import { globalShortcut, ipcMain } from "electron";
import { Utils } from "_m/common/Utils";
import { SendableMessageToMain } from "_t/IpcMessages";
import { ErrorDialog } from "../../common/ErrorDialog";
import { OrangeWindow } from "../common/OrangeWindow";
import { RpcRequestIpcEvent } from "./RpcRequestIpcEvent/RpcRequestIpcEvent";

export class MainWindow extends OrangeWindow {
  private registerIpcListener = () => {
    ipcMain.on(
      "message-to-main",
      async (_event, data: SendableMessageToMain) => {
        if (data.type === "rpc-request") {
          await RpcRequestIpcEvent.handle(data);
        } else if (data.type === "show-error") {
          await ErrorDialog.show(data.payload);
        }
      },
    );
  };

  constructor() {
    super({
      minWidth: 800,
      minHeight: 600,
      width: 1000,
      height: 800,
    });

    this.webContents.once("did-finish-load", this.registerIpcListener);

    /* istanbul ignore next */
    this.webContents.once("did-frame-finish-load", () => {
      if (Utils.isDevelopment()) {
        this.maximize();
        this.webContents.openDevTools();
      } else {
        globalShortcut.register("CmdOrCtrl+R", () => null);
      }
    });

    this.loadFile(`${Utils.getAppRoot()}/renderer/index.html`);
  }
}
