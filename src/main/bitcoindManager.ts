/* eslint-disable no-unused-expressions */
import { spawn, ChildProcess } from "child_process";
import { join } from "path";
import { username, password } from "main/bitcoindCredentials";
import { getAppRoot } from "main/getAppRoot";
import { BrowserWindow } from "electron";
import { createInterface } from "readline";
import { sendMessageToRenderer } from "./sendMessageToRenderer";

class BitcoindManager {
  isProcessRunning = false;
  bitcoindProcess: ChildProcess | null = null;

  startProcess = (mainWindow: BrowserWindow) => {
    if (this.bitcoindProcess !== null) {
      throw new Error("bitcoind process is already running");
    }

    const bitcoindProcess = spawn(join(getAppRoot(), "vendor", "bitcoind"), [
      // "-reindex",
      "-testnet",
      "-server",
      // "-maxuploadtarget=1",
      // "-listen=0",
      // "-maxconnections=1",
      // "-blocksonly",
      `-rpcuser=${username}`,
      `-rpcpassword=${password}`,
    ]);

    // const process = spawn("ls");

    this.isProcessRunning = true;

    createInterface({ input: bitcoindProcess.stdout }).on("line", line => {
      // console.log(line);
      sendMessageToRenderer(
        {
          nonce: __NONCE__,
          type: "bitcoind-line",
          message: line,
        },
        mainWindow,
      );
    });

    bitcoindProcess.stderr.on("data", data => {
      throw new Error(`bitcoind error: ${data}`);
    });

    bitcoindProcess.on("exit", () => {
      this.isProcessRunning = false;
    });

    this.bitcoindProcess = bitcoindProcess;

    return bitcoindProcess;
  };
}

export const bitcoindManager = new BitcoindManager();
