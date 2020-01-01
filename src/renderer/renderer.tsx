import * as React from "react";
import * as ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Provider } from "react-redux";

import { Index } from "renderer/Index";
import { store } from "renderer/redux/store";
// import { registerListenersForMainProcess } from "renderer/redux/registerListenersForMainProcess";
import { GlobalCss } from "renderer/globalCss";
import { theme } from "renderer/theme";

import "typeface-roboto";

// registerListenersForMainProcess();

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
