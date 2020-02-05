import React from "react";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import { Explorer } from "_r/Index/Explorer/Explorer";
import { AppBar } from "./AppBar/AppBar";
import { Curtain } from "./Curtain/Curtain";
// import { StatusBar } from "_r/pages/StatusBar/StatusBar";
// import { Warnings } from "_r/pages/Warnings";
import { useGlobalErrorHandling, useRpcServerStatus } from "./indexHooks";
import { RedirectBasedOnRpcStatus } from "./RedirectBasedOnRpcStatus/RedirectBasedOnRpcStatus";

export const Index = () => {
  useGlobalErrorHandling();

  const rpcServerStatus = useRpcServerStatus();

  return (
    <Router>
      <RedirectBasedOnRpcStatus
        isReady={rpcServerStatus.isReady}
        isShuttingDown={rpcServerStatus.isShuttingDown}
      />
      <Switch>
        <Route exact path="/">
          {/* <Redirect to="/explorer/top" /> */}
          <Curtain
            initMessage={rpcServerStatus.initMessage}
            isShuttingDown={rpcServerStatus.isShuttingDown}
            isReady={rpcServerStatus.isReady}
          />
        </Route>
        <Route path="/explorer/:blockHeight">
          <AppBar />
          <Explorer />
        </Route>
      </Switch>
    </Router>
  );
};
