import { spawn } from "child_process";
import { dialog, app } from "electron";
import { getAppRoot } from "./getAppRoot";
import { getGlobalProcess } from "./getGlobalProcess";

export const startBtcd = () => {
  const { arch, platform } = getGlobalProcess();

  const btcdProcess = spawn(`${getAppRoot()}/bin/${platform}-${arch}/btcd`);

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
