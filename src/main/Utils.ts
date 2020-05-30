import { resolve } from "path";

export class Utils {
  static getAppRoot = () =>
    // Jump out of `main/` to be adjacent to `renderer/` where `package.json`
    // should be.
    resolve(__dirname, "..");

  /**
   * Acquiring `process` through this function rather than directly gives us a
   * chance to mock `process` for tests.
   */
  static getGlobalProcess = () => process;

  static getIsDevelopment = () => process.env.NODE_ENV === "development";
}
