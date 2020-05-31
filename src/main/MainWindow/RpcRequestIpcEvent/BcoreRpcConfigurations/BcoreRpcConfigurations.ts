import { settings } from "_m/Settings/Settings";
import { bitcoinConf } from "./BitcoinConf";
import { cookie } from "./Cookie";

class BcoreRpcConfigurations {
  private getServerUrl = (chainName?: string) => {
    const port =
      // eslint-disable-next-line no-nested-ternary
      chainName === "testnet"
        ? /* istanbul ignore next */ 18332
        : chainName === "regtest"
        ? /* istanbul ignore next */ 18443
        : 8332;

    return `http://127.0.0.1:${port}`;
  };

  getDefault = async () => {
    const cookiePath = cookie.getPath();
    const { username, password } = await this.fromCookie();
    const serverUrl = this.getServerUrl(await bitcoinConf.getChain());

    return { username, password, serverUrl, cookiePath };
  };

  fromCookie = async (cookiePath?: string) => cookie.getCredentials(cookiePath);

  fromDisk = async () => {
    const configurations = await settings.read();

    if (configurations.rpc) {
      if ("cookiePath" in configurations.rpc) {
        const { username, password } = await this.fromCookie();

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
    } = await this.getDefault();

    return { username, password, serverUrl, cookiePath };
  };
}

export const bcoreRpcConfigurations = new BcoreRpcConfigurations();
