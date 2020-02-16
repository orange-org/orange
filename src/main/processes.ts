import { getAppRoot } from "./getAppRoot";

export const processes = {
  // main: getAppRoot(), "renderer", "index.html"),
  renderer: `${getAppRoot()}/renderer/index.html`,

  /**
   * NOT CURRENTLY USED
   *
   * The following process will be used in the future to host the UI for
   * highly sensitive operations, such as wallet operations. This process
   * will not use any npm modules. It will be embedded as an iframe within
   * the `renderer` process.
   */
  // cleanRenderer: join(getAppRoot(), "cleanRenderer", "index.html"),
};
