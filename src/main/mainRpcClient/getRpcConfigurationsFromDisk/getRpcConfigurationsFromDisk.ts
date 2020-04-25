import { readConfigurations } from "_m/writeConfigurations/readConfigurations";
import { getActiveChain } from "./getActiveChain";
import { getBitcoinConf } from "./getBitcoinConf";
import { getCookieFilePath } from "./getCookieFilePath";
import { getDataDir } from "./getDataDir";
import { getRpcCredentialsFromCookieFile } from "./getRpcCredentialsFromCookieFile";
import { getServerUrl } from "./getServerUrl";

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

  const dataDir = getDataDir();
  const bitcoinConf = await getBitcoinConf(dataDir);
  const chainName = getActiveChain(bitcoinConf);
  const cookieFile = getCookieFilePath(chainName, dataDir);
  const { username, password } = await getRpcCredentialsFromCookieFile(
    cookieFile,
  );
  const serverUrl = getServerUrl(chainName);

  return { username, password, serverUrl, cookieFile };
};
