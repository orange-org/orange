/* eslint-disable no-unused-expressions */
import { ChildProcess, spawn } from "child_process";
import { BrowserWindow } from "electron";
import { password, username } from "_m/bitcoindCredentials";
import { getAppRoot } from "_m/getAppRoot";
import { join } from "path";
import { createInterface } from "readline";
import { sendMessageToRenderer } from "_m/sendMessageToRenderer";

class BitcoindManager {
  isProcessRunning = false;
  bitcoindProcess: ChildProcess | null = null;

  startProcess = (mainWindow: BrowserWindow) => {
    const lines: string[] = [];

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
      console.log(line);
      lines.push(line);
    });

    setInterval(() => {
      sendMessageToRenderer(
        {
          nonce: __NONCE__,
          type: "bitcoind-log-lines",
          message: lines,
        },
        mainWindow,
      );

      lines.length = 0;
    }, 1000);

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
