import * as React from "react";
import * as ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader/root";

import { Index } from "_r/Index/Index";
import { store } from "_r/redux/reducers/store";
import { GlobalCss } from "_r/globalCss";
import { theme } from "_r/theme";

import "typeface-roboto";

export const HotApp = hot(App);

ReactDOM.render(<HotApp />, document.getElementById("app"));
