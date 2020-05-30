/* istanbul ignore file: `startMainProcess` is tested */
import { app } from "electron";
import { featureFlags } from "_f/featureFlags";
import { btcd } from "./Btcd";
import { getIsDevelopment } from "./getIsDevelopment";
import { handleSquirrelEvents } from "./handleSquirrelEvents";
import { preventNewWebViewsAndWindows } from "./preventNewWebViewsAndWindows";
import { registerErrorHandling } from "./registerErrorHandling";
import { windowManager } from "./WindowManager";

export class Main {
  isStarted = false;

  start = () => {
    /* istanbul ignore if */
    if (this.isStarted) {
      throw new Error(
        "`startMainProcess` is meant to be called only once per Node.js process",
      );
    }

    this.isStarted = true;

    registerErrorHandling();
    app.enableSandbox();
    app.on("web-contents-created", preventNewWebViewsAndWindows);
    app.on("ready", this.onAppReady);
  };

  onAppReady = () => {
    /* istanbul ignore if: this is both hard to test and non-critical. */
    if (handleSquirrelEvents(app)) {
      return;
    }

    if (!featureFlags.useBcore) {
      btcd.spawn();
    }

    /* istanbul ignore if */
    if (getIsDevelopment()) {
      // eslint-disable-next-line global-require
      require("_m/installExtensions");
    }

    windowManager.createMainWindow();
  };
}

if (process.env.NODE_ENV !== "test") {
  const main = new Main();

  main.start();
}
