import { getActiveChain } from "./getActiveChain";
import { getBitcoinConf } from "./getBitcoinConf";
import { getCookieFilePath } from "./getCookieFilePath";
import { getDataDir } from "./getDataDir";
import { getRpcCredentialsFromCookieFile } from "./getRpcCredentialsFromCookieFile";
import { getServerUrl } from "./getServerUrl";

export const getDefaultRpcConfigurations = async () => {
  const dataDir = getDataDir();
  const bitcoinConf = await getBitcoinConf(dataDir);
  const chainName = getActiveChain(bitcoinConf);
  const cookiePath = getCookieFilePath(chainName, dataDir);
  const { username, password } = await getRpcCredentialsFromCookieFile(
    cookiePath,
  );
  const serverUrl = getServerUrl(chainName);

  return { username, password, serverUrl, cookiePath };
};
