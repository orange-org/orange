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
import { store } from "_r/redux/reducers/store";
import { theme } from "_r/theme";
import { AppBar } from "./AppBar/AppBar";
import { RpcIssueDialog } from "./RpcIssueDialog/RpcIssueDialog";
import { RedirectToHighestBlock } from "./RedirectToHighestBlock/RedirectToHighestBlock";
import { Settings } from "./Settings/Settings";

export const Routes = () => {
  const appBar = <AppBar />;

  return (
    <Router>
      <RpcIssueDialog />

      <Switch>
        <Route exact path="/">
          {appBar}
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
    </Router>
  );
};

export const getApp = () => () => (
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        <GlobalCss />
        <Routes />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
