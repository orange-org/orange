import "normalize.css";
import React, { StrictMode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from "src/data/StoreCreator";
import "src/styles.css";
import { Home } from "./Home/Home";
import { Menu } from "./Menu/Menu";
import { Settings } from "./Settings/Settings";
import { Wallet } from "./Wallet/Wallet";

const App = () => (
  <StrictMode>
    <Provider store={store}>
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
    </Provider>
  </StrictMode>
);

export const getApp = () => App;
