import { randomBytes } from "crypto";
import { commandLineArgs } from "_m/commandLineArgs";

const username = randomBytes(16).toString("hex");
const password = randomBytes(16).toString("hex");
export const hostname = "127.0.0.1";

export const getBtcdRpcConfigurations = () => {
  let port = 8334;

  /* istanbul ignore if */
  if (commandLineArgs.testnet) {
    port = 18334;
  }

  return {
    username,
    password,
    serverUrl: `http://${hostname}:${port}`,
  };
};
