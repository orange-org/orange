import { getGlobalProcess } from "_m/getGlobalProcess";
import { parseCommandLineArgs } from "_m/parseCommandLineArgs";

export const getDataDir = () => {
  const globalProcess = getGlobalProcess();

  let dataDirRoot;

  /**
   * Find the default data directory according to the location described
   * in this page: https://en.bitcoinwiki.org/wiki/Data_directory
   */
  const dataDir = parseCommandLineArgs().datadir;
  if (dataDir) {
    dataDirRoot = dataDir;
  } else if (globalProcess.platform === "win32") {
    dataDirRoot = `${globalProcess.env.APPDATA}/Bitcoin`;
  } else if (globalProcess.platform === "darwin") {
    dataDirRoot = `${globalProcess.env.HOME}/Library/Application Support/Bitcoin`;
  } else {
    dataDirRoot = `${globalProcess.env.HOME}/.bitcoin`;
  }

  return dataDirRoot;
};
