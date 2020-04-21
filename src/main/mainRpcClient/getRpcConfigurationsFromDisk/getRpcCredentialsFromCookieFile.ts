import { promises as fs } from "fs";
import { RPC_ERROR } from "_c/constants";

export const getRpcCredentialsFromCookieFile = async (cookieFile: string) => {
  let cookie: string;

  try {
    cookie = await fs.readFile(cookieFile, {
      encoding: "utf8",
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      // eslint-disable-next-line no-throw-literal
      throw {
        ...error,
        code: RPC_ERROR.couldNotOpenCookieFile,
        message: "Could not open cookie file",
      };
    }

    throw error;
  }

  const [username, password] = cookie.split(":");

  return { username, password };
};
