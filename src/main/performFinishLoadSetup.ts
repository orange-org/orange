import { BrowserWindow, ipcMain } from "electron";
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

export function performFinishLoadSetup(mainWindow: BrowserWindow) {
  function broadcastMessage<MessageType>(
    payload: Omit<MessageFromMain<MessageType>, "source">,
  ) {
    mainWindow.webContents.send("message-from-main", {
      source: "@orange/main",
      ...payload,
    });
  }

  const bitcoindProcess = startBitcoind();
  createInterface({ input: bitcoindProcess.stdout }).on("line", line => {
    // console.log(line);
    broadcastMessage({
      nonce: __NONCE__,
      type: "bitcoind-line",
      message: line,
    });
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
            type: "bitcoind-rpc-response",
            message: await sendRpcRequestToBitcoind(data.message),
          });
        } catch (error) {
          throw new Error(`Error with \`sendRpcRequestToBitcoind\`: ${error}`);
        }
      }
    },
  );

  // setTimeout(() => {
  //   bitcoindProcess.kill("SIGINT");
  // }, 30000);
}
