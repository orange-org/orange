import { spawn } from "child_process";
import { join } from "path";

console.log(
  'join(__dirname, "src", "vendor", "bitocind")',
  join(__dirname, "src", "vendor", "bitocind"),
);

export function startAndMonitorBitcoind() {
  const prc = spawn(join(__dirname, "src", "vendor", "bitcoind"));

  prc.stdout.setEncoding("utf8");

  prc.stdout.on("data", data => {
    const str = data.toString();
    const lines = str.split(/(\r?\n)/g);
    console.log(lines.join(""));
  });

  prc.on("close", code => {
    console.log(`process exit code ${code}`);
  });
}
