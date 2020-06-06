/* eslint-disable max-classes-per-file */
import { spawn } from "child_process";
import { dialog, app } from "electron";
import { randomBytes } from "crypto";
import { commandLineArgs } from "_m/common/CommandLineArgs";
import { RpcServerConfigurations } from "_m/common/RpcServerConfigurations";
import { Settings } from "_m/Settings/Settings";

import { Utils } from "../common/Utils";

class Core {
  private process: ReturnType<typeof spawn> | null = null;

  private args: string[];

  private path: string;

  private getArgs = () => {
    const args = [
      `--rpcuser=${RpcServerConfigurations.username}`,
      `--rpcpassword=${RpcServerConfigurations.password}`,
      `--rpcbind=${RpcServerConfigurations.hostname}`,
      "--server=1",
      "--prune=550",
      `--datadir=${Settings.userDataPath()}/Core`,
    ];

    /* istanbul ignore if */
    if (commandLineArgs.testnet) {
      args.push("--testnet");
    }

    return args;
  };

  private getPath = () => {
    const { platform, arch } = Utils.getGlobalProcess();
    const root = Utils.getAppRoot();
    const bitcoind =
      platform === "win32"
        ? /* istanbul ignore next */ "bitcoind.exe"
        : "bitcoind";

    return `${root}/bin/${platform}-${arch}/${bitcoind}`;
  };

  constructor() {
    this.args = this.getArgs();
    this.path = this.getPath();
  }

  spawn = () => {
    this.process = spawn(this.path, this.args);
    this.process.on(
      "error",
      /* istanbul ignore next */ error => {
        if ((error as any).code === "ENOENT") {
          dialog.showMessageBoxSync({
            message: "We're sorry, but your operating system is not supported.",
          });

          app.exit(0);
        } else {
          throw error;
        }
      },
    );
  };
}

export const core = new Core();
