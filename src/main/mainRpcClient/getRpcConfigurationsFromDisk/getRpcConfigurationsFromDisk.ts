import { getStore } from "_m/getStore";
import { readConfigurations } from "_m/writeConfigurations/readConfigurations";
import { KeysOfUnion } from "_t/typeHelpers";
import { getActiveChain } from "./getActiveChain";
import { getDataDir } from "./getDataDir";
import { getRpcCredentialsFromCookieFile } from "./getRpcCredentialsFromCookieFile";
import { getServerUrl } from "./getServerUrl";
import { getBitcoinConf } from "./getBitcoinConf";
import { getCookieFilePath } from "./getCookieFilePath";

const _getRpcConfigurationsFromDisk = async () => {
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

const getRpcConfigurationsFromDiskWithCache = async (
  allowCachedCredentials = true,
): Promise<{
  username: string;
  password: string;
  serverUrl: string;
  cookieFile: string;
}> => {
  const store = getStore();

  if (
    !allowCachedCredentials ||
    !store.username ||
    /* istanbul ignore next */ !store.password ||
    /* istanbul ignore next */ !store.serverUrl ||
    /* istanbul ignore next */ !store.cookieFile
  ) {
    const {
      username,
      password,
      serverUrl,
      cookieFile,
    } = await _getRpcConfigurationsFromDisk();

    store.username = username;
    store.password = password;
    store.serverUrl = serverUrl;
    store.cookieFile = cookieFile;
  }

  return {
    username: store.username,
    password: store.password,
    serverUrl: store.serverUrl,
    cookieFile: store.cookieFile,
  };
};

export const getRpcConfigurationsFromDisk = getRpcConfigurationsFromDiskWithCache;
