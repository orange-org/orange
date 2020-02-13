/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-expressions */
import { promises as fs } from "fs";
import { getGlobalProcess } from "_m/getGlobalProcess";
import { getStore } from "_m/getStore";

const readCookieCredentials = async () => {
  /**
   * We need to find the `.cookie` file in one of the data dirs. The data
   * dir could be regtest or testnet3, or at the root.
   *
   * We need to figure that out.
   *
   * We start by reading `bitcoin.conf`. But to find `bitcoin.conf`, we
   * need to first find the location of `datadir`.
   *
   * Find the default data directory according to the location described
   * in this page: https://en.bitcoinwiki.org/wiki/Data_directory
   */
  const globalProcess = getGlobalProcess();

  let dataDirRoot;
  if (globalProcess.platform === "win32") {
    dataDirRoot = `${globalProcess.env.APPDATA}/Bitcoin`;
  } else if (globalProcess.platform === "darwin") {
    dataDirRoot = `${globalProcess.env.HOME}/Library/Application Support/Bitcoin`;
  } else {
    dataDirRoot = `${globalProcess.env.HOME}/.bitcoin`;
  }

  /**
   * Now that we have the `dataDir`, we need to find `bitcoin.conf` and
   * determine which network is being used, main, testnet, or regtest.
   */
  const bitcoinConf = await fs.readFile(`${dataDirRoot}/bitcoin.conf`, {
    encoding: "utf8",
  });

  /**
   * Parse `bitcoin.conf`. Use code copied from here:
   * https://github.com/steveukx/properties/blob/96ba64fa1b48b72f0c53e07b99fe38b96001229e/src/PropertiesReader.js#L69-L82
   */
  const possibleChainNames = ["testnet", "regtest"];
  const chainName = bitcoinConf.split("\n").reduce((result, line) => {
    if (!!(line = line.trim())) {
      const section = /^\[([^=]+)]$/.exec(line);
      const property = !section && /^([^#=]+)(={0,1})(.*)$/.exec(line);

      /* istanbul ignore else */
      if (property) {
        const key = property[1].trim();
        const value = property[3].trim();

        /* istanbul ignore else */
        if (possibleChainNames.includes(key) && value === "1") {
          return key;
        }
      }

      /* istanbul ignore next */
      return result;
    }

    return result;
  }, "");

  const dataDir = `${dataDirRoot}/${
    chainName === "testnet"
      ? "testnet3/"
      : chainName === "regtest"
      ? "regtest/"
      : ""
  }`;

  const cookie = await fs.readFile(`${dataDir}.cookie`, {
    encoding: "utf8",
  });
  const [username, password] = cookie.split(":");

  return { username, password };
};

export const getRpcCredentials = async (): Promise<{
  username: string;
  password: string;
}> => {
  const store = getStore();

  if (!store.username || /* istanbul ignore next */ !store.password) {
    const { username, password } = await readCookieCredentials();

    store.username = username;
    store.password = password;
  }

  return {
    username: store.username,
    password: store.password,
  };
};
