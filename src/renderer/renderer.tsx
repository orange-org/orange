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

export const HotApp = hot(getApp());

ReactDOM.render(<HotApp />, document.getElementById("app"));
