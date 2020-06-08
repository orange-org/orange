import {
  // @ts-ignore
  unstable_createMuiStrictModeTheme as createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import "typeface-roboto";
import { Explorer } from "_r/App/Explorer/Explorer";
import { GlobalCss } from "_r/globalCss";
import { store } from "_r/redux/StoreCreator";
import { theme } from "_r/theme";
import { AppBar } from "./AppBar/AppBar";
import { RedirectToHighestBlock } from "./RedirectToHighestBlock/RedirectToHighestBlock";
import { StartScreen } from "./StartScreen/StartScreen";
import { CloseScreen } from "./CloseScreen/CloseScreen";

const MainRoutes = () => {
  const appBar = <AppBar />;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {appBar}
          <RedirectToHighestBlock />
        </Route>

        <Route path="/explorer/:blockHeightAsId">
          {appBar}
          <Explorer />
        </Route>
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
