import * as React from "react";
import * as ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader/root";

import { Index } from "_r/pages/Index";
import { store } from "_r/redux/reducers/store";
import { GlobalCss } from "_r/globalCss";
import { theme } from "_r/theme";

import "typeface-roboto";

export const App = hot(() => (
  <Provider store={store}>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <GlobalCss />
      <Index />
    </ThemeProvider>
  </Provider>
));

ReactDOM.render(<App />, document.getElementById("app"));
