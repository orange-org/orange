import { getStore } from "_m/getStore";
import { getGlobalProcess } from "_m/getGlobalProcess";

export const getDataDir = () => {
  const store = getStore();
  const globalProcess = getGlobalProcess();

  let dataDirRoot;

  /**
   * Find the default data directory according to the location described
   * in this page: https://en.bitcoinwiki.org/wiki/Data_directory
   */
  if (store?.args?.datadir) {
    dataDirRoot = store.args.datadir;
  } else if (globalProcess.platform === "win32") {
    dataDirRoot = `${globalProcess.env.APPDATA}/Bitcoin`;
  } else if (globalProcess.platform === "darwin") {
    dataDirRoot = `${globalProcess.env.HOME}/Library/Application Support/Bitcoin`;
  } else {
    dataDirRoot = `${globalProcess.env.HOME}/.bitcoin`;
  }

  return dataDirRoot;
};
