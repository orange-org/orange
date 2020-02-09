import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import "typeface-roboto";
import { Explorer } from "_r/App/Explorer/Explorer";
import { GlobalCss } from "_r/globalCss";
import { createStore } from "_r/redux/reducers/store";
import { theme } from "_r/theme";
import { AppBar } from "./AppBar/AppBar";
import { RedirectToHighestBlock } from "./RedirectToHighestBlock/RedirectToHighestBlock";

export const getApp = (
  store: ReturnType<typeof createStore> = createStore(),
) => () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        <GlobalCss />

        <Router>
          <Switch>
            <Route exact path="/">
              <RedirectToHighestBlock />
            </Route>

            <Route path="/explorer/:blockHeightAsId">
              <AppBar />
              <Explorer />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
