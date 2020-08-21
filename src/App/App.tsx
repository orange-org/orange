import "sakura.css/css/normalize.css";
import "sakura.css/css/sakura-dark.css";

import React, { StrictMode } from "react";
import { store } from "src/data/StoreCreator";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Home } from "./Home/Home";
import { Wallet } from "./Wallet/Wallet";

const App = () => (
  <StrictMode>
    <Provider store={store}>
      <Router>
        <h1>
          <Link to="/">Orange</Link>
        </h1>

        <Switch>
          <Route exact path="/">
            <Home />
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
