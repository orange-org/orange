import { spawn } from "child_process";
import { dialog, app } from "electron";
import { getAppRoot } from "./getAppRoot";
import { getGlobalProcess } from "./getGlobalProcess";

export const startBtcd = () => {
  const { platform, arch } = getGlobalProcess();
  const root = getAppRoot();

  const btcdProcess = spawn(`${root}/bin/${platform}-${arch}/btcd`, [
    "--rpcuser=111",
    "--rpcpass=111",
    "--testnet",
    "--txindex",
    `--rpccert="${root}/cert/cert.pem"`,
    `--rpckey="${root}/cert/key.pem"`,
  ]);

  btcdProcess.on("error", error => {
    if ((error as any).code === "ENOENT") {
      dialog.showMessageBoxSync({
        message: "We're sorry, but your operating system is not supported.",
      });

      app.exit(0);
    } else {
      throw error;
    }
  });
};
