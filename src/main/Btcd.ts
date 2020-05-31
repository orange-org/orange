import { spawn } from "child_process";
import { dialog, app } from "electron";
import { btcdRpcConfigurations } from "./common/BtcdRpcConfigurations";
import { commandLineArgs } from "./CommandLineArgs";
import { Utils } from "./Utils";

class Btcd {
  private process: ReturnType<typeof spawn> | null = null;

  private args: string[];

  private path: string;

  private getArgs = () => {
    const args = [
      `--rpcuser=${btcdRpcConfigurations.username}`,
      `--rpcpass=${btcdRpcConfigurations.password}`,
      `--notls`,
      `--txindex`,
      `--rpclisten=${btcdRpcConfigurations.hostname}`,
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
    const btcd =
      platform === "win32" ? /* istanbul ignore next */ "btcd.exe" : "btcd";

    return `${root}/bin/${platform}-${arch}/${btcd}`;
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

export const btcd = new Btcd();
