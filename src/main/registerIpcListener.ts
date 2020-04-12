import { BrowserWindow, ipcMain } from "electron";
import { sendMessageToRenderer } from "_m/sendMessageToRenderer";
import { MessageToMain } from "_t/IpcMessages";
import { sendRpcRequestToBitcoind } from "./sendRpcRequestToBitcoind/sendRpcRequestToBitcoind";
import { showErrorDialog } from "./showErrorDialog";

export const registerIpcListener = (mainWindow: BrowserWindow) => {
  ipcMain.on("message-to-main", async (_event, data: MessageToMain) => {
    /* istanbul ignore else */
    if (data.type === "rpc-request") {
      const response = await sendRpcRequestToBitcoind(data.message);

      sendMessageToRenderer(
        {
          nonce: __NONCE__,
          type: "rpc-response",
          message: response,
        },
        mainWindow,
      );
    }

    if (data.type === "show-error") {
      showErrorDialog(data.message);
    }
  });
};
