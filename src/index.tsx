import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { getApp } from "src/App/App";

export const HotApp = hot(getApp());

ReactDOM.render(<HotApp />, document.getElementById("app"));
