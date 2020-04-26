import { promises as fs } from "fs";
import { RPC_ERROR } from "_c/constants";
import { ErrorWithCode } from "_c/ErrorWithCode";

export const getBitcoinConf = async (dataDir: string) => {
  try {
    return await fs.readFile(`${dataDir}/bitcoin.conf`, {
      encoding: "utf8",
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new ErrorWithCode(
        "Could not open `bitcoin.conf`",
        RPC_ERROR.couldNotOpenBitcoinConf,
      );
    }

    throw error;
  }
};
