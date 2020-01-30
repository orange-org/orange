import React from "react";
import { Route, Switch, MemoryRouter as Router } from "react-router-dom";
import { Explorer } from "_r/pages/Explorer/Explorer";
// import { StatusBar } from "_r/pages/StatusBar/StatusBar";
// import { Warnings } from "_r/pages/Warnings";
import { useGlobalErrorHandling } from "./indexHooks";

export const Index: React.FC = () => {
  useGlobalErrorHandling();

  // const { isShuttingDown, isWarmingUp, initMessage } = useRpcServerStatus();

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Explorer />
        </Route>
      </Switch>
    </Router>
  );
};
