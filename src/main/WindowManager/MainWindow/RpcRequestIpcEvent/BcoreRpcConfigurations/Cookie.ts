import { promises as fs } from "fs";
import { ErrorWithCode } from "_c/ErrorWithCode";
import { RPC_ERROR } from "_c/constants";
import { bitcoinConf } from "./BitcoinConf";

export class Cookie {
  public static getPath = async () => {
    const chain = await bitcoinConf.getChain();
    const dataDir = bitcoinConf.getDataDir();

    let networkDir: string;

    /* istanbul ignore if */ if (chain === "testnet") {
      networkDir = `${dataDir}/testnet3/`;
    } /* istanbul ignore if */ else if (chain === "regtest") {
      networkDir = `${dataDir}/regtest/`;
    } else {
      networkDir = `${dataDir}/`;
    }

    return `${networkDir}.cookie`;
  };

  public static getCredentials = async (cookiePath_?: string) => {
    let parsedContent: string[];
    const cookiePath = cookiePath_ || (await Cookie.getPath());

    try {
      const cookieContent = await fs.readFile(cookiePath, {
        encoding: "utf8",
      });

      parsedContent = cookieContent.split(":");

      if (parsedContent.length === 0 || parsedContent[0] !== "__cookie__") {
        throw new ErrorWithCode("", "NOTCOOKIEFILE");
      }
    } catch (error) {
      /* istanbul ignore else */
      if (
        error.code === "ENOENT" ||
        error.code === "EACCES" ||
        error.code === "EISDIR" ||
        error.code === "NOTCOOKIEFILE"
      ) {
        throw new ErrorWithCode(
          "Could not open cookie file",
          RPC_ERROR.couldNotOpenCookieFile,
        );
      }

      /* istanbul ignore next */
      throw error;
    }

    const [username, password] = parsedContent;

    return { username, password };
  };
}
