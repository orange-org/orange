/* eslint-disable no-console */
/**
 * This file is only used to make the app hot-reloadable during development
 * and then insert the app into the DOM. Given its function, there's no real
 * need to include it in test coverage.
 */
/* istanbul ignore file */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import "typeface-roboto";
import { getApp } from "_r/App/App";
import { callMain } from "./callMain";

const handleError = (event: ErrorEvent | PromiseRejectionEvent) => {
  callMain({
    nonce: __NONCE__,
    type: "show-error",
    message:
      "reason" in event
        ? `Unhandled rejection: ${JSON.stringify(event.reason, null, 2)}`
        : [
            `Message: ${event.message}`,
            `Error object: ${JSON.stringify(event.error, null, 2)}`,
          ].join("\n"),
  });
};

window.addEventListener("unhandledrejection", handleError);
window.addEventListener("error", handleError);

export const HotApp = hot(getApp());

ReactDOM.render(<HotApp />, document.getElementById("app"));
