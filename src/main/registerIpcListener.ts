import { BrowserWindow, ipcMain, shell } from "electron";
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
    } else if (data.type === "open-debug-file") {
      // I'm worried about this. I feel it's too powerful and could be a security risk.
      // I would rather bitcoind had a command to open the debug file itself. Or at least
      // if it had a way to tell us where the debug.log file is so that we don't have to
      // pass an arbitrary string to be opened here.
      shell.openItem(data.message);
    }
  });
};
