import { spawn } from "child_process";
import { join } from "path";
import { username, password } from "main/bitcoindCredentials";

export function startBitcoind() {
  return spawn(join(__dirname, "vendor", "bitcoind"), [
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
}
