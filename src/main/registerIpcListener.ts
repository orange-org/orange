import { ipcMain } from "electron";
import { callRenderer } from "_m/callRenderer";
import { MessageToMain } from "_t/IpcMessages";
import { mainRpcClient } from "./mainRpcClient/mainRpcClient";
import { showErrorDialog } from "./showErrorDialog";

export const registerIpcListener = () => {
  ipcMain.on("message-to-main", async (_event, data: MessageToMain) => {
    /* istanbul ignore else */
    if (data.type === "rpc-request") {
      const response = await mainRpcClient(data.message);

      callRenderer({
        nonce: __NONCE__,
        type: "rpc-response",
        message: response,
      });
    }

    if (data.type === "show-error") {
      showErrorDialog(data.message);
    }
  });
};
