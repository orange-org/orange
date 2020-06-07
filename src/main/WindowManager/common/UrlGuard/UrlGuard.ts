import { dirname, normalize } from "path";
import { Utils } from "_m/common/Utils";

export class UrlGuard {
  static isAllowed = (url: string) => {
    const { protocol, hostname, pathname } = new URL(url);

    // During development
    if (Utils.isDevelopment()) {
      // Allow installing extensions
      if (
        protocol === "https:" &&
        (hostname === "clients2.googleusercontent.com" ||
          hostname === "clients2.google.com")
      ) {
        return true;
      }

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
    // located in the app root directory
    if (protocol === "file:") {
      const normalizedPathname = normalize(pathname);
      const platformSpecificAppRoot =
        Utils.getGlobalProcess().platform === "win32"
          ? /* istanbul ignore next */ `\\${Utils.getAppRoot()}`
          : Utils.getAppRoot();

      /* istanbul ignore else */
      if (
        normalizedPathname.substr(0, platformSpecificAppRoot.length) ===
        platformSpecificAppRoot
      ) {
        return true;
      }
    }

    // Block all else
    return false;
  };
}
