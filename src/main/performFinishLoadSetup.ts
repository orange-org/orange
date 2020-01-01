import { BrowserWindow, ipcMain, App } from "electron";
import { createInterface } from "readline";

import { MessageFromMain, MessageFromRenderer } from "typings/types";
import { startBitcoind } from "main/startBitcoind";
import { sendRpcRequestToBitcoind } from "main/sendRpcRequestToBitcoind";
import { RpcRequest } from "typings/bitcoindRpcRequests";
import { RpcResponse } from "typings/bitcoindRpcResponses";

function isRpcRequestMessage(
  data: MessageFromRenderer<any>,
): data is MessageFromRenderer<RpcRequest> {
  return data.message.method !== undefined;
}

export function performFinishLoadSetup(mainWindow: BrowserWindow, app: App) {
  let bitcoindIsRunning = false;
  let quitAttempted = false;

  function broadcastMessage<MessageType>(
    payload: Omit<MessageFromMain<MessageType>, "source">,
  ) {
    mainWindow.webContents.send("message-from-main", {
      source: "@orange/main",
      ...payload,
    });
  }

  const bitcoindProcess = startBitcoind();
  bitcoindIsRunning = true;
  createInterface({ input: bitcoindProcess.stdout }).on("line", line => {
    // console.log(line);
    broadcastMessage({
      nonce: __NONCE__,
      type: "bitcoind-line",
      message: line,
    });
  });

  bitcoindProcess.on("exit", () => {
    bitcoindIsRunning = false;

    if (quitAttempted) {
      app.quit();
    }
  });

  bitcoindProcess.stderr.on("data", data => {
    throw new Error(`bitcoind error: ${data}`);
  });

  ipcMain.on(
    "message-from-renderer",
    async (_event, data: MessageFromRenderer<any>) => {
      if (isRpcRequestMessage(data)) {
        try {
          broadcastMessage<RpcResponse>({
            nonce: __NONCE__,
            type: "rpc-response",
            message: await sendRpcRequestToBitcoind(data.message),
          });
        } catch (error) {
          throw new Error(`Error with \`sendRpcRequestToBitcoind\`: ${error}`);
        }
      }
    },
  );

  app.on("before-quit", event => {
    quitAttempted = true;

    if (bitcoindIsRunning) {
      event.preventDefault();
      bitcoindProcess.kill();
    }
  });
}
