import { promises as fs } from "fs";
import { RPC_ERROR } from "_c/constants";

export const getBitcoinConf = async (dataDir: string) => {
  try {
    return await fs.readFile(`${dataDir}/bitcoin.conf`, {
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
};
