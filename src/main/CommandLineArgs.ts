import { Utils } from "./Utils";

class CommandLineArgs {
  public dataDir: string | null = null;

  public testnet: string | null = null;

  constructor() {
    const globalProcess = Utils.getGlobalProcess();
    const args = globalProcess.argv;

    for (const arg of args) {
      const [name, value] = arg.split("=");

      /* istanbul ignore if */
      if (name.substr(0, 2) === "--") {
        this[name.substr(2) as keyof CommandLineArgs] = value || "true";
      }
    }
  }
}

export const commandLineArgs = new CommandLineArgs();
