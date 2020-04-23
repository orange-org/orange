/* eslint-disable no-throw-literal */
import { promises as fs } from "fs";
import { RPC_ERROR } from "_c/constants";

export const getRpcCredentialsFromCookieFile = async (cookieFile: string) => {
  let cookie: string;

  try {
    cookie = await fs.readFile(cookieFile, {
      encoding: "utf8",
    });

    if (
      cookie.split(":").length === 0 ||
      cookie.split(":")[0] !== "__cookie__"
    ) {
      throw { code: "NOTCOOKIEFILE" };
    }
  } catch (error) {
    if (
      error.code === "ENOENT" ||
      error.code === "EACCES" ||
      error.code === "EISDIR" ||
      error.code === "NOTCOOKIEFILE"
    ) {
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
