/* eslint-disable no-unused-expressions */
import { spawn } from "child_process";
import { join } from "path";
import { username, password } from "main/bitcoindCredentials";
import { getAppRoot } from "./getAppRoot";

export const startBitcoind = () => {
  return spawn(join(getAppRoot(), "vendor", "bitcoind"), [
    "-reindex",
    "-testnet",
    "-server",
    "-maxuploadtarget=1",
    "-listen=0",
    // "-maxconnections=1",
    // "-blocksonly",
    `-rpcuser=${username}`,
    `-rpcpassword=${password}`,
  ]);

  // return spawn("ls");
};

// class BitcoindProcessManager {
//   private process: ChildProcess | null = null;
//   private callback: Function | null = null;

//   isRunning = false;

//   setExitCallback = (callback: Function) => {
//     if (this.callback !== null) {
//       this.callback = callback;
//     } else {
//       throw new Error("Callback is already set");
//     }
//   };

//   start = () => {
//     // this.process = spawn(join(getAppRoot(), "vendor", "bitcoind"), [
//     //   "-reindex",
//     //   "-testnet",
//     //   "-server",
//     //   "-maxuploadtarget=1",
//     //   "-listen=0",
//     //   // "-maxconnections=1",
//     //   // "-blocksonly",
//     //   `-rpcuser=${username}`,
//     //   `-rpcpassword=${password}`,
//     // ]);

//     this.process = spawn("ls");
//     this.isRunning = true;

//     this.process.on("exit", () => {
//       this.isRunning = false;

//       if (this.callback !== null) {
//         this.callback();
//       }
//     });
//   };

//   kill = () => {
//     if (this.process !== null) {
//       this.process.kill();
//     } else {
//       throw new Error(
//         "Could not kill bitcoind process because it has not been started",
//       );
//     }
//   };
// }

// export const bitcoindProcessManager = new BitcoindProcessManager();
