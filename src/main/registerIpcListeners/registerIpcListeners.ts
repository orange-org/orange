import { ipcMain } from "electron";
import { SendableMessageToMain } from "_t/IpcMessages";
import { showErrorDialog } from "../showErrorDialog";
import { handleRpcRequest } from "./handleRpcRequest";
import { handleGetCookieFileFromOpenDialog } from "./handleGetCookieFileFromOpenDialog";
import { handleGetRpcConfigurations } from "./handleGetRpcConfigurations";
import { handleSaveBitcoinCoreConnectionConfigurations } from "./handleSaveBitcoinCoreConnectionConfigurations";

export const registerIpcListener = () => {
  ipcMain.on("message-to-main", async (_event, data: SendableMessageToMain) => {
    /* istanbul ignore else */
    if (data.type === "rpc-request") {
      await handleRpcRequest(data);
    } else if (data.type === "show-error") {
      await showErrorDialog(data.payload);
    } else if (data.type === "get-cookie-file-from-open-dialog") {
      await handleGetCookieFileFromOpenDialog(data);
    } else if (data.type === "get-rpc-configurations") {
      await handleGetRpcConfigurations(data);
    } else if (data.type === "save-bitcoin-core-connection-configurations") {
      await handleSaveBitcoinCoreConnectionConfigurations(data);
    }
  });
};
