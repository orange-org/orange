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
import { RpcIssueDialog } from "./RpcIssueDialog/RpcIssueDialog";
import { RedirectToHighestBlock } from "./RedirectToHighestBlock/RedirectToHighestBlock";
import { Settings } from "./Settings/Settings";
import { StartScreen } from "./StartScreen/StartScreen";

const MainRoutes = () => {
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

const renderComponent = () => {
  if (window.location.hash === "#start") {
    return <StartScreen />;
  }

  return <MainRoutes />;
};

const App = () => (
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        <GlobalCss />
        {renderComponent()}
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

export const getApp = () => App;
