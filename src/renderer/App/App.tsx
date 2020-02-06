import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import {
  MemoryRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "typeface-roboto";
import { GlobalCss } from "_r/globalCss";
import { Explorer } from "_r/App/Explorer/Explorer";
import { store } from "_r/redux/reducers/store";
import { theme } from "_r/theme";
import { AppBar } from "./AppBar/AppBar";

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        <GlobalCss />
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/explorer/top" />
            </Route>
            <Route path="/explorer/:blockHeight">
              <AppBar />
              <Explorer />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
