import React from "react";
import {
  MemoryRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Explorer } from "_r/Index/Explorer/Explorer";
import { AppBar } from "./AppBar/AppBar";

export const Index = () => {
  return (
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
  );
};
