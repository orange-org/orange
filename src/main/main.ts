/* istanbul ignore file: `startMainProcess` is tested */
import { app, WebContents } from "electron";
import { ErrorDialog } from "./common/ErrorDialog";
import { squirrelEvents } from "./SquirrelEvents/SquirrelEvents";
import { windowManager } from "./WindowManager/WindowManager";
import { Utils } from "./common/Utils";
import { ChromeExtensions } from "./ChromeExtensions/ChromeExtensions";
import { core } from "./Core/Core";

export class Main {
  private isStarted = false;

  private isQuitting = false;

  private preventNewWebViewsAndWindows = (
    _event: Event,
    contents: WebContents,
  ) => {
    contents.on("will-attach-webview", contentEvent => {
      contentEvent.preventDefault();
    });

    contents.on("new-window", contentEvent => {
      contentEvent.preventDefault();
    });
  };

  private onAppReady = () => {
    /* istanbul ignore if: this is both hard to test and non-critical. */
    if (squirrelEvents.handle()) {
      return;
    }

    core.spawn();

    /* istanbul ignore if */
    if (Utils.isDevelopment()) {
      ChromeExtensions.install();
    }

    windowManager.start();
  };

  private handleQuitting = async (event: Electron.Event) => {
    if (!this.isQuitting) {
      event.preventDefault();

      this.isQuitting = true;

      windowManager.close();
      await core.stop();
      app.quit();
    }
  };

  private registerErrorHandling = () => {
    const globalErrorHandler = (error: Error | {} | null | undefined) => {
      /* istanbul ignore else */
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        ErrorDialog.show(
          error instanceof Error
            ? error.toString()
            : JSON.stringify(error, null, 2),
        );
      }
    };

    process.on("uncaughtException", globalErrorHandler);
    process.on("unhandledRejection", globalErrorHandler);
  };

  start = () => {
    /* istanbul ignore if */
    if (this.isStarted) {
      throw new Error(
        "`startMainProcess` is meant to be called only once per Node.js process",
      );
    }

    this.isStarted = true;

    this.registerErrorHandling();

    app.enableSandbox();
    app.on("web-contents-created", this.preventNewWebViewsAndWindows);
    app.on("ready", this.onAppReady);
    app.on("before-quit", this.handleQuitting);
    app.on("window-all-closed", this.handleQuitting);
  };
}

if (process.env.NODE_ENV !== "test") {
  const main = new Main();

  main.start();
}
