import { spawn } from "child_process";
import { app, dialog } from "electron";
import fs from "fs-extra";
import { Settings } from "_m/Settings/Settings";
import { Utils } from "../../common/Utils";

export abstract class BackendService {
  private process: ReturnType<typeof spawn> | null = null;

  constructor(private dataDirName: string, private binaryFilename: string) {}

  getDatadir = () => `${Settings.userDataPath()}/${this.dataDirName}`;

  private getPath = () => {
    const { platform, arch } = Utils.getGlobalProcess();
    const root = Utils.getAppRoot();
    const bitcoind =
      platform === "win32"
        ? /* istanbul ignore next */ `${this.binaryFilename}.exe`
        : this.binaryFilename;

    return `${root}/bin/${platform}-${arch}/${bitcoind}`;
  };

  spawn = async () => {
    await fs.ensureDir(this.getDatadir());

    this.process = spawn(this.getPath(), this.getArgs(), {
      stdio: ["ignore", "ignore", "pipe"],
    });

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

  stop = () =>
    new Promise(resolve => {
      this.process?.on("close", () => {
        resolve();
      });
      this.process?.kill("SIGTERM");
    });

  abstract getArgs: () => string[];

  abstract call: (...args: any[]) => any;
}
