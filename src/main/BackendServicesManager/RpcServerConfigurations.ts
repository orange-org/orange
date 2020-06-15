import { randomBytes } from "crypto";
import { Utils } from "_m/common/Utils";
import { commandLineArgs } from "_m/common/CommandLineArgs";

export class RpcServerConfigurations {
  private static generateRandomPassword = () =>
    Utils.isDevelopment() ? "1" : randomBytes(16).toString("hex");

  private static computePort = () => {
    let port = 8332;

    /* istanbul ignore if */
    if (commandLineArgs.testnet) {
      port = 18332;
    }

    return port;
  };

  private static computeUrl = () =>
    `http://${RpcServerConfigurations.hostname}:${RpcServerConfigurations.port}`;

  static port = RpcServerConfigurations.computePort();

  static hostname = "127.0.0.1";

  static username = RpcServerConfigurations.generateRandomPassword();

  static password = RpcServerConfigurations.generateRandomPassword();

  static serverUrl = RpcServerConfigurations.computeUrl();
}
