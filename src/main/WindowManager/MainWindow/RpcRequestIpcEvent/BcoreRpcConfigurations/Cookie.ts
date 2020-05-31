import { promises as fs } from "fs";
import { ErrorWithCode } from "_c/ErrorWithCode";
import { RPC_ERROR } from "_c/constants";
import { bitcoinConf } from "./BitcoinConf";

class Cookie {
  private credentials: { username: string; password: string } | null = null;

  private path: string | null = null;

  public getPath = async () => {
    if (!this.path) {
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

      this.path = `${networkDir}.cookie`;
    }

    return this.path;
  };

  public getCredentials = async (cookiePath_?: string) => {
    if (!this.credentials) {
      let parsedContent: string[];
      const cookiePath = cookiePath_ || (await this.getPath());

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

      this.credentials = { username, password };
    }

    return this.credentials;
  };
}

export const cookie = new Cookie();
