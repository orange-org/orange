import React from "react";
import {
  MemoryRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Explorer } from "_r/Index/Explorer/Explorer";
import { AppBar } from "./AppBar/AppBar";
// import { StatusBar } from "_r/pages/StatusBar/StatusBar";
// import { Warnings } from "_r/pages/Warnings";
import { useGlobalErrorHandling } from "./indexHooks";

export const Index: React.FC = () => {
  useGlobalErrorHandling();

  return (
    <Router>
      <AppBar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/explorer/top" />
        </Route>
        <Route path="/explorer/:blockHeight">
          <Explorer />
        </Route>
      </Switch>
    </Router>
  );
};
