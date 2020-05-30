import { settings } from "_m/Settings/Settings";
import { getRpcCredentialsFromCookie } from "./getRpcCredentialsFromCookie";
import { getDefaultRpcConfigurations } from "./getDefaultRpcConfigurations";

export const getRpcConfigurationsFromDisk = async () => {
  const configurations = await settings.read();

  if (configurations.rpc) {
    if ("cookiePath" in configurations.rpc) {
      const { username, password } = await getRpcCredentialsFromCookie(
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
