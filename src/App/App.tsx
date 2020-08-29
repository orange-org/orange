import "normalize.css";
import React, { StrictMode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from "src/data/StoreCreator";
import "src/styles.css";
import { AppBar } from "./AppBar/AppBar";
import { Home } from "./Home/Home";
import { Menu } from "./Menu/Menu";
import { Settings } from "./Settings/Settings";
import { Wallet } from "./Wallet/Wallet";

const App = () => {
  const [isReady, setReady] = useState(false);

  /**
   * TODO: this is a hack to get the React Portal to work. The problem is that
   * if we render a component too quickly, the AppBar DOM would not be ready
   * and React would not know where to put content of the AppBarPortal.
   * This delay gives the AppBar component to get into the DOM before we use
   * AppBarPortal in the deeper component. I'll need to fix this eventually.
   */
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 500);
  }, []);

  return (
    <StrictMode>
      <Provider store={store}>
        <Router>
          <AppBar />

          {isReady && (
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/menu">
                <Menu />
              </Route>

              <Route path="/settings">
                <Settings />
              </Route>

              <Route path="/wallet">
                <Wallet />
              </Route>
            </Switch>
          )}
        </Router>
      </Provider>
    </StrictMode>
  );
};

export const getApp = () => App;
