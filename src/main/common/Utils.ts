/* istanbul ignore file: being mocked in tests, that's why it's not getting hit.
If it becomes critical enough, we should unit test it. */
import path from "path";

export class Utils {
  static getAppRoot = () =>
    // Jump out of `main/` to be adjacent to `renderer/` where `package.json`
    // should be.
    path.resolve(__dirname, "..");

  /**
   * Acquiring `process` through this function rather than directly gives us a
   * chance to mock `process` for tests.
   */
  static getGlobalProcess = () => process;

  static isDevelopment = () => process.env.NODE_ENV === "development";

  static delay = (duration: number) =>
    new Promise(resolve => setTimeout(resolve, duration));
}
