import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import "typeface-roboto";
import { Explorer } from "_r/App/Explorer/Explorer";
import { GlobalCss } from "_r/globalCss";
import { store as store_ } from "_r/redux/reducers/store";
import { theme } from "_r/theme";
import { AppBar } from "./AppBar/AppBar";
import { RedirectToHighestBlock } from "./RedirectToHighestBlock/RedirectToHighestBlock";
import { Settings } from "./Settings/Settings";
import { FixBitcoinCoreConnection } from "./FixBitcoinCoreConnection/FixBitcoinCoreConnection";

export const getApp = (
  /* istanbul ignore next */
  store = store_,
) => () => {
  const appBar = <AppBar />;

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
              {appBar}
              <Explorer />
            </Route>

            <Route path="/settings">
              {appBar}
              <Settings />
            </Route>
          </Switch>

          <Switch>
            <Route path="/fix-bitcoin-core-connection">
              <FixBitcoinCoreConnection />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
