import {
  SendableMessageToRenderer,
  SendableMessageToMain,
} from "_t/IpcMessages";
import { ipcMain, BrowserWindow } from "electron";
import { ErrorDialog } from "_m/common/ErrorDialog";
import { MainWindow } from "./MainWindow/MainWindow";
import { StartWindow } from "./StartWindow/StartWindow";
import { RpcRequestIpcEvent } from "./RpcRequestIpcEvent/RpcRequestIpcEvent";
import { CloseWindow } from "./CloseWindow/CloseWindow";

class WindowManager {
  private startWindow: StartWindow | null = null;

  private mainWindow: MainWindow | null = null;

  private closeWindow: CloseWindow | null = null;

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

  private nullOnClosed = (
    browserWindow: BrowserWindow,
    windowName: "mainWindow" | "startWindow" | "closeWindow",
  ) => {
    browserWindow.on("close", () => {
      this[windowName] = null;
    });
  };

  private createMainWindow = () => {
    this.mainWindow = new MainWindow();
    this.nullOnClosed(this.mainWindow, "mainWindow");
  };

  private createStartWindow = () => {
    this.startWindow = new StartWindow();
    this.nullOnClosed(this.startWindow, "startWindow");
  };

  private createCloseWindow = () => {
    this.closeWindow = new CloseWindow();
    this.nullOnClosed(this.closeWindow, "closeWindow");
  };

  close = () => {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.destroy();
    }

    this.createCloseWindow();
  };

  start = () => {
    this.createStartWindow();
  };

  constructor() {
    this.registerIpcListener();
  }
}

export const windowManager = new WindowManager();
