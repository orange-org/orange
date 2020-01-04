import * as React from "react";
import * as ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Provider } from "react-redux";

import { Index } from "_r/Index";
import { store } from "_r/redux/store";
import { registerBitcoindLogListener } from "_r/redux/registerBitcoindLogListener.ts";
import { GlobalCss } from "_r/globalCss";
import { theme } from "_r/theme";

import "typeface-roboto";

registerBitcoindLogListener();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <GlobalCss />
      <Index />
    </ThemeProvider>
  </Provider>,
  document.getElementById("app"),
);
