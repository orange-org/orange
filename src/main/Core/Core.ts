/* eslint-disable max-classes-per-file */
import fs from "fs-extra";
import { spawn } from "child_process";
import { app, dialog } from "electron";
import { commandLineArgs } from "_m/common/CommandLineArgs";
import { RpcServerConfigurations } from "_m/common/RpcServerConfigurations";
import { Settings } from "_m/Settings/Settings";
import { Utils } from "../common/Utils";

class Core {
  private static getDatadir = () => `${Settings.userDataPath()}/Core`;

  private static getArgs = () => {
    const args = [
      `--rpcuser=${RpcServerConfigurations.username}`,
      `--rpcpassword=${RpcServerConfigurations.password}`,
      "--server=1",
      "--prune=550",
      `--datadir=${Core.getDatadir()}`,
    ];

    /* istanbul ignore if */
    if (commandLineArgs.testnet) {
      args.push("--testnet");
    }

    return args;
  };

  private static getPath = () => {
    const { platform, arch } = Utils.getGlobalProcess();
    const root = Utils.getAppRoot();
    const bitcoind =
      platform === "win32"
        ? /* istanbul ignore next */ "bitcoind.exe"
        : "bitcoind";

    return `${root}/bin/${platform}-${arch}/${bitcoind}`;
  };

  private process: ReturnType<typeof spawn> | null = null;

  spawn = async () => {
    await fs.ensureDir(Core.getDatadir());
    this.process = spawn(Core.getPath(), Core.getArgs(), { stdio: "ignore" });
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
