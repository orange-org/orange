import * as React from "react";
import * as ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Provider } from "react-redux";

import { Index } from "r/Index";
import { store } from "r/redux/store";
import { registerBitcoindLogListener } from "r/redux/registerBitcoindLogListener.ts";
import { GlobalCss } from "r/globalCss";
import { theme } from "r/theme";

import "typeface-roboto";

registerBitcoindLogListener();

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <GlobalCss />
      <Index />
    </ThemeProvider>
  </Provider>,
  mainElement,
);
