import "normalize.css";
import React, { StrictMode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store, StoreCreator } from "src/data/StoreCreator";
import "src/styles.css";
import { Actions } from "src/data/Actions";
import { Home } from "./Home/Home";
import { Menu } from "./Menu/Menu";
import { Settings } from "./Settings/Settings";
import { Wallet } from "./Wallet/Wallet";
import { LoadingApp } from "./LoadingApp/LoadingApp";

const App = () => {
  const [isLoadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const request = async () => {
      const state = await StoreCreator.loadState();

      store.dispatch(Actions.setState(state));
      setLoadingState(false);
    };

    request();
  }, []);

  return (
    <StrictMode>
      <Provider store={store}>
        {isLoadingState ? (
          <LoadingApp />
        ) : (
          <Router>
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
          </Router>
        )}
      </Provider>
    </StrictMode>
  );
};

export const getApp = () => App;
