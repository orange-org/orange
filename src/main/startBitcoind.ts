import { spawn } from "child_process";
import { join } from "path";

export function startBitcoind() {
  return spawn(join(__dirname, "vendor", "bitcoind"), [
    // "-reindex",
    "-testnet",
    "-server",
    "-maxuploadtarget=1",
    "-listen=0",
    "-maxconnections=1",
    "-blocksonly",
    "-rpcuser=XXX",
    "-rpcpassword=YYY",
  ]);
}
