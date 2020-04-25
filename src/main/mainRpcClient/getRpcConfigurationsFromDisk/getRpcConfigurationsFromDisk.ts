import { readConfigurations } from "_m/writeConfigurations/readConfigurations";
import { getRpcCredentialsFromCookieFile } from "./getRpcCredentialsFromCookieFile";
import { getDefaultRpcConfigurations } from "./getDefaultRpcConfigurations";

export const getRpcConfigurationsFromDisk = async () => {
  const configurations = await readConfigurations();

  if (configurations.rpc) {
    if ("cookieFile" in configurations.rpc) {
      const { username, password } = await getRpcCredentialsFromCookieFile(
        configurations.rpc.cookieFile,
      );

      return {
        username,
        password,
        serverUrl: configurations.rpc.serverUrl,
        cookieFile: configurations.rpc.cookieFile,
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
    cookieFile,
  } = await getDefaultRpcConfigurations();

  return { username, password, serverUrl, cookieFile };
};
