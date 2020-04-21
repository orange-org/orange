import { ipcMain } from "electron";
import { MessageToMain } from "_t/IpcMessages";
import { showErrorDialog } from "../showErrorDialog";
import { handleRpcRequest } from "./handleRpcRequest";

export const registerIpcListener = () => {
  ipcMain.on("message-to-main", async (_event, data: MessageToMain) => {
    /* istanbul ignore else */
    if (data.type === "rpc-request") {
      await handleRpcRequest(data);
    }

    if (data.type === "show-error") {
      showErrorDialog(data.message);
    }
  });
};
