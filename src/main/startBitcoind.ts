import { spawn } from "child_process";
import { join } from "path";

export function startBitcoind() {
  return spawn(join(__dirname, "vendor", "bitcoind"), ["-reindex"]);
}
