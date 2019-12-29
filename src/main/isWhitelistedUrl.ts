import { dirname } from "path";
import { isDevelopment } from "./isDevelopment";

const thisFileDirname = dirname(__filename);

export const isWhitelistedUrl = (url: string) => {
  const { protocol, hostname, pathname } = new URL(url);

  // During development
  if (isDevelopment) {
    // Allow devtools
    if (protocol === "devtools:" && hostname === "devtools") {
      return true;
    }

    // Allow Chrome extensions for development, like React and Redux Devtools
    if (
      (protocol === "blob:" &&
        dirname(pathname).split(":")[0] === "chrome-extension") ||
      protocol === "chrome-extension:"
    ) {
      return true;
    }

    // Allow connection to localhost, this is needed for Hot Module Replacement
    if (hostname === "localhost") {
      return true;
    }
  }

  // In either development or production, allow loading any file
  // in the same directory as this file
  if (protocol === "file:" && dirname(pathname) === thisFileDirname) {
    return true;
  }

  // Block all else
  return false;
};
