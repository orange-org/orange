/* eslint-disable no-unused-expressions */
import { ChildProcess, spawn } from "child_process";
import { BrowserWindow } from "electron";
import { password, username } from "_m/bitcoindCredentials";
import { getAppRoot } from "_m/getAppRoot";
import { join } from "path";
import { createInterface } from "readline";
import { sendMessageToRenderer } from "_m/sendMessageToRenderer";
import fs from "fs";

class BitcoindManager {
  isProcessRunning = false;
  bitcoindProcess: ChildProcess | null = null;

  startProcess = (mainWindow: BrowserWindow) => {
    if (this.bitcoindProcess !== null) {
      throw new Error("bitcoind process is already running");
    }

    const bitcoindProcess = spawn(
      "/Users/mk/Code/github/bitcoin/bitcoin/src/bitcoind",
      [
        // "-reindex",
        // "-testnet",
        // "-server",
        // "-maxuploadtarget=1",
        // "-listen=0",
        // "-maxconnections=1",
        // "-blocksonly",
        `-rpcuser=${username}`,
        `-rpcpassword=${password}`,
      ],
      {
        stdio: ["ignore", "ignore", "pipe"],
      },
    );

    // const process = spawn("ls");

    this.isProcessRunning = true;

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
