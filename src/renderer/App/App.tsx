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
import { AppBar } from "./Frame/AppBar/AppBar";
import { RpcIssueDialog } from "./RpcIssueDialog/RpcIssueDialog";
import { RedirectFromHomepage } from "./RedirectFromHomepage/RedirectFromHomepage";
import { Settings } from "./Settings/Settings";
import { Wallet } from "./Wallet/Wallet";
import { Frame } from "./Frame/Frame";
import { DebugLocation } from "./DebugLocation";

export const Routes = () => {
  const appBar = <AppBar />;

  return (
    <Router>
      <RpcIssueDialog />
      <DebugLocation />

      <Switch>
        <Route exact path="/">
          {appBar}
          <RedirectFromHomepage />
        </Route>

        <Route path="/explorer/:blockHeightAsId?">
          <Frame>
            <Explorer />
          </Frame>
        </Route>

        <Route path="/settings">
          <Frame>
            <Settings />
          </Frame>
        </Route>

        <Route path="/wallet">
          <Frame>
            <Wallet />
          </Frame>
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
