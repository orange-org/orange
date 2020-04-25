import { respondToRenderer } from "_m/callRenderer";
import { getActiveChain } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getActiveChain";
import { getBitcoinConf } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getBitcoinConf";
import { getCookieFilePath } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getCookieFilePath";
import { getDataDir } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getDataDir";
import { getRpcCredentialsFromCookieFile } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getRpcCredentialsFromCookieFile";
import { getServerUrl } from "_m/mainRpcClient/getRpcConfigurationsFromDisk/getServerUrl";
import { RpcConfigurations, SendableMessageToMain } from "_t/IpcMessages";

const returnNullIfError = async <T extends () => any>(
  f: T,
): Promise<ReturnType<T> | null> => {
  try {
    return await f();
  } catch (e) {
    return null;
  }
};

export const handleGetSavedRpcConfigurations = async (
  data: Extract<
    SendableMessageToMain,
    { type: "get-saved-rpc-configurations" }
  >,
) => {
  const username = "";
  const password = "";
  let serverUrl = getServerUrl();
  let cookieFile = "";

  const dataDir = getDataDir();
  const bitcoinConf = await returnNullIfError(() => getBitcoinConf(dataDir));

  if (bitcoinConf) {
    const activeChain = getActiveChain(bitcoinConf);
    const cookieFilePath = getCookieFilePath(activeChain, dataDir);
    const isAbleToGetRpcCredentialsFromCookie = await returnNullIfError(() =>
      getRpcCredentialsFromCookieFile(cookieFilePath),
    );

    if (isAbleToGetRpcCredentialsFromCookie) {
      cookieFile = cookieFilePath;
    }

    serverUrl = getServerUrl(activeChain);
  }

  const rpcConfigurations: RpcConfigurations = cookieFile
    ? {
        serverUrl,
        cookieFile,
      }
    : {
        serverUrl,
        username,
        password,
      };

  respondToRenderer({
    nonce: __NONCE__,
    type: data.type,
    payload: rpcConfigurations,
    messageId: data.messageId,
  });
};
