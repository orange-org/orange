import { BrowserWindow, ipcMain, App } from "electron";
import { createInterface } from "readline";

import { MessageFromMain, MessageFromRenderer } from "typings/types";
import { bitcoindManager } from "main/bitcoindManager";
import { sendRpcRequestToBitcoind } from "main/sendRpcRequestToBitcoind";
import { RpcRequest } from "typings/bitcoindRpcRequests";
import { RpcResponse } from "typings/bitcoindRpcResponses";
import { sendMessageToRenderer } from "./sendMessageToRenderer";

function isRpcRequestMessage(
  data: MessageFromRenderer<any>,
): data is MessageFromRenderer<RpcRequest> {
  return data.message.method !== undefined;
}

export function performFinishLoadSetup(mainWindow: BrowserWindow, app: App) {
  let quitAttempted = false;

  const bitcoindProcess = bitcoindManager.startProcess(mainWindow);

  bitcoindProcess.on("exit", () => {
    if (quitAttempted) {
      app.quit();
    }
  });

  ipcMain.on(
    "message-to-main",
    async (_event, data: MessageFromRenderer<any>) => {
      if (isRpcRequestMessage(data)) {
        try {
          sendMessageToRenderer<RpcResponse>(
            {
              nonce: __NONCE__,
              type: "rpc-response",
              message: await sendRpcRequestToBitcoind(data.message),
            },
            mainWindow,
          );
        } catch (error) {
          throw new Error(`Error with \`sendRpcRequestToBitcoind\`: ${error}`);
        }
      }
    },
  );

  app.on("before-quit", event => {
    quitAttempted = true;

    if (bitcoindManager.isProcessRunning) {
      event.preventDefault();
      bitcoindProcess.kill();
    }
  });
}
