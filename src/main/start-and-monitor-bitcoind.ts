import { spawn } from "child_process";
import { join } from "path";

export function startAndMonitorBitcoind() {
  console.log(
    'join(__dirname, "src", "vendor", "bitcoind")',
    join(__dirname, "src", "vendor", "bitcoind"),
  );
  const prc = spawn(join(__dirname, "vendor", "bitcoind"));

  prc.stdout.setEncoding("utf8");

  console.log("=\nFILE: start-and-monitor-bitcoind.ts\nLINE: 9\n=");
  prc.stdout.on("data", data => {
    const str = data.toString();
    const lines = str.split(/(\r?\n)/g);
    console.log(lines.join(""));
  });

  prc.on("close", code => {
    console.log(`process exit code ${code}`);
  });
}
