/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
import { Utils } from "_m/common/Utils";
import { promises as fs } from "fs";
import { ErrorWithCode } from "_c/ErrorWithCode";
import { RPC_ERROR } from "_c/constants";

export class BitcoinConf {
  public static getDataDir = () => {
    const globalProcess = Utils.getGlobalProcess();

    let dataDir;

    /**
     * Find the default data directory according to the location described
     * in this page: https://en.bitcoinwiki.org/wiki/Data_directory
     */
    /* istanbul ignore if */ if (globalProcess.platform === "win32") {
      dataDir = `${globalProcess.env.APPDATA}/Bitcoin`;
    } /* istanbul ignore if */ else if (globalProcess.platform === "darwin") {
      dataDir = `${globalProcess.env.HOME}/Library/Application Support/Bitcoin`;
    } else {
      dataDir = `${globalProcess.env.HOME}/.bitcoin`;
    }

    return dataDir;
  };

  public static getChain = async () => {
    const content = await BitcoinConf.getContent();
    const possibleChainNames = ["testnet", "regtest"];

    /**
     * Parse `bitcoin.conf`. Use code copied from here:
     * https://github.com/steveukx/properties/blob/96ba64fa1b48b72f0c53e07b99fe38b96001229e/src/PropertiesReader.js#L69-L82
     */
    const chain = content.split("\n").reduce((result, line) => {
      if ((line = line.trim())) {
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

    return chain;
  };

  private static getContent = async () => {
    const dataDir = BitcoinConf.getDataDir();
    let content: string;

    try {
      content = await fs.readFile(`${dataDir}/bitcoin.conf`, {
        encoding: "utf8",
      });
    } catch (error) {
      /* istanbul ignore else */
      if (error.code === "ENOENT") {
        throw new ErrorWithCode(
          "Could not open `bitcoin.conf`",
          RPC_ERROR.couldNotOpenBitcoinConf,
        );
      }

      /* istanbul ignore next */
      throw error;
    }

    return content;
  };
}
