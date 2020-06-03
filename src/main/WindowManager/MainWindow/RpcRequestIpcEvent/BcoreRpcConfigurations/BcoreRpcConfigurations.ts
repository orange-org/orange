import { settings } from "_m/Settings/Settings";
import { bitcoinConf } from "./BitcoinConf";
import { Cookie } from "./Cookie";

export class BcoreRpcConfigurations {
  private static getServerUrl = (chainName?: string) => {
    const port =
      // eslint-disable-next-line no-nested-ternary
      chainName === "testnet"
        ? /* istanbul ignore next */ 18332
        : chainName === "regtest"
        ? /* istanbul ignore next */ 18443
        : 8332;

    return `http://127.0.0.1:${port}`;
  };

  static getDefault = async () => {
    const cookiePath = Cookie.getPath();
    const { username, password } = await BcoreRpcConfigurations.fromCookie();
    const serverUrl = BcoreRpcConfigurations.getServerUrl(
      await bitcoinConf.getChain(),
    );

    return { username, password, serverUrl, cookiePath };
  };

  static fromCookie = async (cookiePath?: string) =>
    Cookie.getCredentials(cookiePath);

  static fromDisk = async () => {
    const configurations = await settings.read();

    if (configurations.rpc) {
      if ("cookiePath" in configurations.rpc) {
        const {
          username,
          password,
        } = await BcoreRpcConfigurations.fromCookie();

        return {
          username,
          password,
          serverUrl: configurations.rpc.serverUrl,
          cookiePath: configurations.rpc.cookiePath,
        };
      }

      return {
        username: configurations.rpc.username,
        password: configurations.rpc.password,
        serverUrl: configurations.rpc.serverUrl,
      };
    }

    const {
      username,
      password,
      serverUrl,
      cookiePath,
    } = await BcoreRpcConfigurations.getDefault();

    return { username, password, serverUrl, cookiePath };
  };
}
