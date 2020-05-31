import { randomBytes } from "crypto";
import { commandLineArgs } from "_m/CommandLineArgs";

export class BtcdRpcConfigurations {
  hostname = "127.0.0.1";

  username = randomBytes(16).toString("hex");

  password = randomBytes(16).toString("hex");

  serverUrl: string;

  constructor() {
    let port = 8334;

    /* istanbul ignore if */
    if (commandLineArgs.testnet) {
      port = 18334;
    }

    this.serverUrl = `http://${this.hostname}:${port}`;
  }
}

export const btcdRpcConfigurations = new BtcdRpcConfigurations();
