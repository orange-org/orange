import { randomBytes } from "crypto";
import { commandLineArgs } from "./CommandLineArgs";
import { Utils } from "./Utils";

export class RpcServerConfigurations {
  private static generateRandomPassword = () =>
    Utils.isDevelopment() ? "1" : randomBytes(16).toString("hex");

  private static computeUrl() {
    let port = 8334;

    /* istanbul ignore if */
    if (commandLineArgs.testnet) {
      port = 18332;
    }

    return `http://${RpcServerConfigurations.hostname}:${port}`;
  }

  static hostname = "127.0.0.1";

  static username = RpcServerConfigurations.generateRandomPassword();

  static password = RpcServerConfigurations.generateRandomPassword();

  static serverUrl = RpcServerConfigurations.computeUrl();
}
