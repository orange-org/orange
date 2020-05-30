import { Utils } from "_m/Utils";

export const getDataDir = () => {
  const globalProcess = Utils.getGlobalProcess();

  let dataDirRoot;

  /**
   * Find the default data directory according to the location described
   * in this page: https://en.bitcoinwiki.org/wiki/Data_directory
   */
  /* istanbul ignore if */ if (globalProcess.platform === "win32") {
    dataDirRoot = `${globalProcess.env.APPDATA}/Bitcoin`;
  } /* istanbul ignore if */ else if (globalProcess.platform === "darwin") {
    dataDirRoot = `${globalProcess.env.HOME}/Library/Application Support/Bitcoin`;
  } else {
    dataDirRoot = `${globalProcess.env.HOME}/.bitcoin`;
  }

  return dataDirRoot;
};
