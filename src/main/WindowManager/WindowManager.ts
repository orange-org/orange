import {
  SendableMessageToRenderer,
  SendableMessageToMain,
} from "_t/IpcMessages";
import { ipcMain } from "electron";
import { ErrorDialog } from "_m/common/ErrorDialog";
import { MainWindow } from "./MainWindow/MainWindow";
import { StartWindow } from "./StartWindow/StartWindow";
import { RpcRequestIpcEvent } from "./RpcRequestIpcEvent/RpcRequestIpcEvent";

class WindowManager {
  private startWindow: StartWindow | null = null;

  private rpcServerIsReady = () => {
    this.createMainWindow();
    this.startWindow?.destroy();
  };

  private registerIpcListener = () => {
    ipcMain.on(
      "message-to-main",
      async (event, data: SendableMessageToMain) => {
        const reply = (
          messageToRenderer: Omit<SendableMessageToRenderer, "source">,
        ) =>
          event.reply("message-to-renderer", {
            source: "@orange/main",
            ...messageToRenderer,
          });

        if (data.type === "rpcRequest") {
          reply(await RpcRequestIpcEvent.handle(data));
        } else if (data.type === "showError") {
          await ErrorDialog.show(data.payload);
        } else if (data.type === "setIsReady") {
          this.rpcServerIsReady();
        }
      },
    );
  };

  private createMainWindow = () => {
    // eslint-disable-next-line no-new
    new MainWindow();
  };

  private createStartWindow = () => {
    this.startWindow = new StartWindow();
  };

  show = () => {
    this.createStartWindow();
  };

  constructor() {
    this.registerIpcListener();
  }
}

export const windowManager = new WindowManager();
