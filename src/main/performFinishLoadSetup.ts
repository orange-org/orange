import { BrowserWindow, systemPreferences, ipcMain } from "electron";
import { createInterface } from "readline";
import { MessageFromMain, RpcRequest } from "typings/types";
import { startBitcoind } from "./startBitcoind";
import { sendRpcRequestToBitcoind } from "./sendRpcRequestToBitcoind";

export function performFinishLoadSetup(mainWindow: BrowserWindow) {
  function broadcastMessage<MessageType>(
    payload: Omit<MessageFromMain<MessageType>, "source">,
  ) {
    mainWindow.webContents.send("message-from-main", {
      source: "@orange/main",
      ...payload,
    });
  }

  broadcastMessage({
    nonce: "__NONCE__",
    type: "system-preference",
    message: {
      colorWindowBackground: systemPreferences.getColor("window-background"),
    },
  });

  const bitcoindProcess = startBitcoind();
  createInterface({ input: bitcoindProcess.stdout }).on("line", line => {
    // console.log(line);
    broadcastMessage({
      nonce: "__NONCE__",
      type: "bitcoind-line",
      message: line,
    });
  });

  bitcoindProcess.stderr.on("data", data => {
    throw new Error(`bitcoind error: ${data}`);
  });

  ipcMain.on("message-from-renderer", async (_event, data: RpcRequest) => {
    try {
      broadcastMessage({
        nonce: "__NONCE__",
        type: "bitcoind-rpc-response",
        message: (await sendRpcRequestToBitcoind(data)).result,
      });
    } catch (error) {
      throw new Error(`Error with \`sendRpcRequestToBitcoind\`: ${error}`);
    }
  });

  // setTimeout(() => {
  //   bitcoindProcess.kill("SIGINT");
  // }, 30000);
}
