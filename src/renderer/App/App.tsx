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
import { RedirectFromHomepage } from "./RedirectFromHomepage/RedirectFromHomepage";
import { Settings } from "./Settings/Settings";
import { Wallet } from "./Wallet/Wallet";

export const Routes = () => {
  const appBar = <AppBar />;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {appBar}
          <RedirectFromHomepage />
        </Route>

        <Route path="/explorer/:blockHeightAsId">
          {appBar}
          <Explorer />
          <RpcIssueDialog />
        </Route>

        <Route path="/settings">
          {appBar}
          <Settings />
        </Route>

        <Route path="/wallet">
          {appBar}
          <Wallet />
        </Route>
      </Switch>
    </Router>
  );
};

const App = () => (
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

export const getApp = () => App;
