import {
  CssBaseline,
  ThemeProvider,
  // @ts-ignore
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import "typeface-roboto";
import { FeatureFlags } from "_f/FeatureFlags";
import { Explorer } from "_r/App/Explorer/Explorer";
import { GlobalCss } from "_r/globalCss";
import { store } from "_r/redux/StoreCreator";
import { theme } from "_r/theme";
import { AppBar } from "./AppBar/AppBar";
import { CloseScreen } from "./CloseScreen/CloseScreen";
import { RedirectFromRoot } from "./RedirectFromRoot/RedirectFromRoot";
import { StartScreen } from "./StartScreen/StartScreen";
import { Wallet } from "./Wallet/Wallet";
import { DebugLocation } from "./DebugLocation";

const MainRoutes = () => {
  const appBar = <AppBar />;

  return (
    <Router>
      <DebugLocation />

      <Switch>
        <Route exact path="/">
          {appBar}
          <RedirectFromRoot />
        </Route>

        <Route path="/wallet">
          {appBar}
          <Wallet />
        </Route>

        {FeatureFlags.enableExplorer ? (
          <Route path="/explorer/:blockHeightAsId">
            {appBar}
            <Explorer />
          </Route>
        ) : null}
      </Switch>
    </Router>
  );
};

const getComponent = () => {
  if (window.location.hash === "#start") {
    return StartScreen;
  }
  if (window.location.hash === "#close") {
    return CloseScreen;
  }

  return MainRoutes;
};

const MainComponent = getComponent();

const App = () => (
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        <GlobalCss />
        <MainComponent />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

export const getApp = () => App;
