import { merge } from "lodash";
// import { Utils as OriginalUtils } from "_m/common/Utils";

export const Utils = {
  getAppRoot: () => "/",

  /**
   * Set some consistent values for Node `process` variable
   */
  getGlobalProcess: jest.fn().mockImplementation(() =>
    merge(
      { ...process },
      {
        env: {
          APPDATA: "/appData",
          HOME: "/home",
        },
        platform: "linux",
      },
    ),
  ),

  isDevelopment: jest.fn().mockImplementation(() => true),
};
