import { getActiveChain } from "./getActiveChain";
import { getBitcoinConf } from "./getBitcoinConf";
import { getCookiePath } from "./getCookiePath";
import { getDataDir } from "./getDataDir";
import { getRpcCredentialsFromCookie } from "./getRpcCredentialsFromCookie";
import { getServerUrl } from "./getServerUrl";

export const getDefaultRpcConfigurations = async () => {
  const dataDir = getDataDir();
  const bitcoinConf = await getBitcoinConf(dataDir);
  const chainName = getActiveChain(bitcoinConf);
  const cookiePath = getCookiePath(chainName, dataDir);
  const { username, password } = await getRpcCredentialsFromCookie(cookiePath);
  const serverUrl = getServerUrl(chainName);

  return { username, password, serverUrl, cookiePath };
};
