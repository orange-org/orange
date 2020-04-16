import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React, { ReactNode } from "react";
import { Provider, useSelector } from "react-redux";
import {
  MemoryRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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
  const isBitcoinCoreConnected = useSelector(s => s.isBitcoinCoreConnected);
  const requireBitcoinCoreConnection = (Component: React.FC) => {
    if (false) {
      return <Component />;
    }

    return <Redirect to="/fix-bitcoin-core-connection" />;
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        <GlobalCss />

        <Router>
          <Switch>
            <Route exact path="/">
              {requireBitcoinCoreConnection(() => (
                <RedirectToHighestBlock />
              ))}
            </Route>

            <Route path="/explorer/:blockHeightAsId">
              {requireBitcoinCoreConnection(() => (
                <>
                  {appBar}
                  <Explorer />
                </>
              ))}
            </Route>

            <Route path="/settings">
              {appBar}
              <Settings />
            </Route>

            <Route path="/fix-bitcoin-core-connection">
              <FixBitcoinCoreConnection />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
