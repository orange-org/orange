import { spawn } from "child_process";
import { dialog, app } from "electron";
import { buildConstants } from "_m/../../webpack/buildConstants";
import { getAppRoot } from "./getAppRoot";
import { getGlobalProcess } from "./getGlobalProcess";

export const startBtcd = () => {
  const { platform, arch } = getGlobalProcess();
  const root = getAppRoot();

  const btcdProcess = spawn(`${root}/${buildConstants.btcd(platform, arch)}`, [
    "--rpcuser=111",
    "--rpcpass=111",
    "--testnet",
    "--txindex",
    `--rpccert="${root}/${buildConstants.certPem}"`,
    `--rpckey="${root}/${buildConstants.keyPem}"`,
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
