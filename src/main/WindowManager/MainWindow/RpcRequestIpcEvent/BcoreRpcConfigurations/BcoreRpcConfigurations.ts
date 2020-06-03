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

  static getDefault = async (chain: string) => {
    const cookiePath = Cookie.getPath(chain);
    const { username, password } = await BcoreRpcConfigurations.fromCookie(
      chain,
    );
    const serverUrl = BcoreRpcConfigurations.getServerUrl();

    return { username, password, serverUrl, cookiePath };
  };

  static fromCookie = async (chain: string, cookiePath?: string) =>
    Cookie.getCredentials(chain, cookiePath);

  static fromDisk = async (chain: string) => {
    const configurations = await settings.read();

    if (configurations.rpc) {
      if ("cookiePath" in configurations.rpc) {
        const { username, password } = await BcoreRpcConfigurations.fromCookie(
          chain,
        );

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
    } = await BcoreRpcConfigurations.getDefault(chain);

    return { username, password, serverUrl, cookiePath };
  };
}
