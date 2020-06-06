import { randomBytes } from "crypto";
import { commandLineArgs } from "./CommandLineArgs";

export class RpcServerConfigurations {
  private static computeUrl() {
    let port = 8334;

    /* istanbul ignore if */
    if (commandLineArgs.testnet) {
      port = 18334;
    }

    return `http://${RpcServerConfigurations.hostname}:${port}`;
  }

  static hostname = "127.0.0.1";

  static username = randomBytes(16).toString("hex");

  static password = randomBytes(16).toString("hex");

  static url = RpcServerConfigurations.computeUrl();
}
