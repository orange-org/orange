import { ipcMain } from "electron";
import { SendableMessageToMain } from "_t/IpcMessages";
import { showErrorDialog } from "../showErrorDialog";
import { handleRpcRequest } from "./handleRpcRequest";
import { handleShowCookieOpenDialog } from "./handleShowCookieOpenDialog";

export const registerIpcListener = () => {
  ipcMain.on("message-to-main", async (_event, data: SendableMessageToMain) => {
    /* istanbul ignore else */
    if (data.type === "rpc-request") {
      await handleRpcRequest(data);
    } else if (data.type === "show-error") {
      showErrorDialog(data.payload);
    } else if (data.type === "show-cookie-open-dialog") {
      handleShowCookieOpenDialog(data);
    }
  });
};
