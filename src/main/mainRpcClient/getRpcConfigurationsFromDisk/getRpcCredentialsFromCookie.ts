import { promises as fs } from "fs";
import { RPC_ERROR } from "_c/constants";
import { ErrorWithCode } from "_c/ErrorWithCode";

export const getRpcCredentialsFromCookie = async (cookiePath: string) => {
  let cookie: string;

  try {
    cookie = await fs.readFile(cookiePath, {
      encoding: "utf8",
    });

    if (
      cookie.split(":").length === 0 ||
      cookie.split(":")[0] !== "__cookie__"
    ) {
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

  const [username, password] = cookie.split(":");

  return { username, password };
};
