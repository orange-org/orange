import { promises as fs } from "fs";
import { RPC_ERROR } from "_c/constants";
import { getStore } from "_m/getStore";
import { callRenderer } from "_m/callRenderer";
import { getActiveChain } from "./getActiveChain";
import { getDataDir } from "./getDataDir";
import { getRpcCredentialsFromCookieFile } from "./getRpcCredentialsFromCookieFile";
import { getServerUrl } from "./getServerUrl";

const _getRpcConfigurationsFromDisk = async () => {
  /**
   * We need to find the `.cookie` file in one of the data dirs. The data
   * dir could be regtest or testnet3, or at the root.
   *
   * We need to figure that out.
   *
   * We start by reading `bitcoin.conf`. But to find `bitcoin.conf`, we
   * need to first find the location of `datadir`.
   */
  const dataDir = getDataDir();

  /**
   * Now that we have the `dataDir`, we need to find `bitcoin.conf` and
   * determine which network is being used, main, testnet, or regtest.
   */
  let bitcoinConf: string;
  try {
    bitcoinConf = await fs.readFile(`${dataDir}/bitcoin.conf`, {
      encoding: "utf8",
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      // eslint-disable-next-line no-throw-literal
      throw {
        ...error,
        code: RPC_ERROR.couldNotOpenBitcoinConf,
        message: "Could not open `bitcoin.conf`",
      };
    }

    throw error;
  }

  const chainName = getActiveChain(bitcoinConf);

  let networkDir: string;

  if (chainName === "testnet") {
    networkDir = `${dataDir}/testnet3/`;
  } else if (chainName === "regtest") {
    networkDir = `${dataDir}/regtest/`;
  } else {
    networkDir = `${dataDir}/`;
  }

  const cookieFile = `${networkDir}.cookie`;
  const { username, password } = await getRpcCredentialsFromCookieFile(
    cookieFile,
  );
  const serverUrl = getServerUrl(chainName);

  callRenderer({
    nonce: __NONCE__,
    type: "set-data-in-redux-store",
    payload: { cookieFile, username, password, serverUrl },
  });

  return { username, password, serverUrl };
};

const getRpcConfigurationsFromDiskWithCache = async (
  allowCachedCredentials = true,
): Promise<{
  username: string;
  password: string;
  serverUrl: string;
}> => {
  const store = getStore();

  if (
    !allowCachedCredentials ||
    !store.username ||
    /* istanbul ignore next */ !store.password ||
    /* istanbul ignore next */ !store.serverUrl
  ) {
    const {
      username,
      password,
      serverUrl,
    } = await _getRpcConfigurationsFromDisk();

    store.username = username;
    store.password = password;
    store.serverUrl = serverUrl;
  }

  return {
    username: store.username,
    password: store.password,
    serverUrl: store.serverUrl,
  };
};

export const getRpcConfigurationsFromDisk = getRpcConfigurationsFromDiskWithCache;
