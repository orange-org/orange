import { spawn } from "child_process";
import { join } from "path";
import { username, password } from "main/bitcoindCredentials";
import { getAppRoot } from "./getAppRoot";

export function startBitcoind() {
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
}
