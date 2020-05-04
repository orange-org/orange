import { readConfigurations } from "_m/writeConfigurations/readConfigurations";
import { getRpcCredentialsFromCookieFile } from "./getRpcCredentialsFromCookieFile";
import { getDefaultRpcConfigurations } from "./getDefaultRpcConfigurations";

export const getRpcConfigurationsFromDisk = async () => {
  const configurations = await readConfigurations();

  if (configurations.rpc) {
    if ("cookiePath" in configurations.rpc) {
      const { username, password } = await getRpcCredentialsFromCookieFile(
        configurations.rpc.cookiePath,
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
  } = await getDefaultRpcConfigurations();

  return { username, password, serverUrl, cookiePath };
};
