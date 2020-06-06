import { Settings } from "_m/Settings/Settings";
import { Cookie } from "./Cookie";

export class CoreRpcConfigurations {
  private static getServerUrl = (chain: string) => {
    const port =
      // eslint-disable-next-line no-nested-ternary
      chain === "testnet"
        ? /* istanbul ignore next */ 18332
        : chain === "regtest"
        ? /* istanbul ignore next */ 18443
        : 8332;

    return `http://127.0.0.1:${port}`;
  };

  static getDefault = async (chain: string) => {
    const cookiePath = Cookie.getPath(chain);
    const { username, password } = await CoreRpcConfigurations.fromCookie(
      chain,
    );
    const serverUrl = CoreRpcConfigurations.getServerUrl(chain);

    return { username, password, serverUrl, cookiePath };
  };

  static fromCookie = async (chain: string, cookiePath?: string) =>
    Cookie.getCredentials(chain, cookiePath);

  static fromDisk = async (chain: string) => {
    const configurations = await Settings.read();

    if (configurations.rpc) {
      if ("cookiePath" in configurations.rpc) {
        const { username, password } = await CoreRpcConfigurations.fromCookie(
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
    } = await CoreRpcConfigurations.getDefault(chain);

    return { username, password, serverUrl, cookiePath };
  };
}
