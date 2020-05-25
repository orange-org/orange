import { spawn } from "child_process";
import { dialog, app } from "electron";
import { getAppRoot } from "./getAppRoot";
import { getGlobalProcess } from "./getGlobalProcess";
import {
  hostname,
  getBtcdRpcConfigurations,
} from "./mainRpcClient/getBtcdRpcConfigurations";
import { commandLineArgs } from "./commandLineArgs";

export const startBtcd = () => {
  const { platform, arch } = getGlobalProcess();
  const root = getAppRoot();
  const btcdRpcConfigurations = getBtcdRpcConfigurations();
  const btcdArgs: string[] = [
    `--rpcuser=${btcdRpcConfigurations.username}`,
    `--rpcpass=${btcdRpcConfigurations.password}`,
    `--notls`,
    `--txindex`,
    `--rpclisten=${hostname}`,
  ];

  if (commandLineArgs.testnet) {
    btcdArgs.push("--testnet");
  }

  const btcdProcess = spawn(`${root}/bin/${platform}-${arch}/btcd`, btcdArgs);

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
