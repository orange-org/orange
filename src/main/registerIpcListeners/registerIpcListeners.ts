/* istanbul ignore file: the handlers are what needs to be tested. This doesn't. */
import { ipcMain } from "electron";
import { SendableMessageToMain } from "_t/IpcMessages";
import { showErrorDialog } from "../showErrorDialog";
import { handleRpcRequest } from "./handleRpcRequest";
import { handleGetCookiePathFromOpenDialog } from "./handleGetCookiePathFromOpenDialog";
import { handleGetSavedRpcConfigurations } from "./handleGetSavedRpcConfigurations";
import { handleSaveRpcConfigurations } from "./handleSaveRpcConfigurations";

export const registerIpcListener = () => {
  ipcMain.on("message-to-main", async (_event, data: SendableMessageToMain) => {
    if (data.type === "rpc-request") {
      await handleRpcRequest(data);
    } else if (data.type === "show-error") {
      await showErrorDialog(data.payload);
    } else if (data.type === "get-cookie-path-from-open-dialog") {
      await handleGetCookiePathFromOpenDialog(data);
    } else if (data.type === "get-saved-rpc-configurations") {
      await handleGetSavedRpcConfigurations(data);
    } else if (data.type === "save-rpc-configurations") {
      await handleSaveRpcConfigurations(data);
    }
  });
};
