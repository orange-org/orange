import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import "typeface-roboto";
import { App } from "_r/App/App";

export const HotApp = hot(App);

ReactDOM.render(<HotApp />, document.getElementById("app"));
