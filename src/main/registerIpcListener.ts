import { BrowserWindow, ipcMain } from "electron";
import { sendMessageToRenderer } from "_m/sendMessageToRenderer";
import { MessageToMain } from "_t/IpcMessages";
import { sendRpcRequestToBitcoind } from "./sendRpcRequestToBitcoind";

export const registerIpcListener = (mainWindow: BrowserWindow) => {
  ipcMain.on("message-to-main", async (_event, data: MessageToMain) => {
    if (data.type === "rpc-request") {
      try {
        const response = await sendRpcRequestToBitcoind(data.message);

        sendMessageToRenderer(
          {
            nonce: __NONCE__,
            type: "rpc-response",
            message: response,
          },
          mainWindow,
        );
      } catch (error) {
        throw new Error(`Error with \`sendRpcRequestToBitcoind\`: ${error}`);
      }
    }
  });
};
