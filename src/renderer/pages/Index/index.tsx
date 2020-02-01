import React from "react";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import { Explorer } from "_r/pages/Explorer/Explorer";
import { AppBar } from "../AppBar/AppBar";
// import { StatusBar } from "_r/pages/StatusBar/StatusBar";
// import { Warnings } from "_r/pages/Warnings";
import { useGlobalErrorHandling } from "./indexHooks";

export const Index: React.FC = () => {
  useGlobalErrorHandling();

  return (
    <Router>
      <AppBar />
      <Switch>
        <Route path="/">
          <Explorer />
        </Route>
      </Switch>
    </Router>
  );
};
