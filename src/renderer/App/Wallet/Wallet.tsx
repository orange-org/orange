import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { AccessExistingWallet } from "./AccessExistingWallet/AccessExistingWallet";
import { CompensateToolbarHeight } from "../components/CompensateToolbarHeight/CompensateToolbarHeight";

export const Wallet = () => {
  const history = useHistory();
  const a = useAtomicCss();

  useEffect(() => {
    history.push("/wallet/import");
  }, [history]);

  return (
    <div className={a("topLevelComponent")}>
      <CompensateToolbarHeight />
      <Switch>
        <Route path="/wallet/import">
          <AccessExistingWallet />
        </Route>
      </Switch>
    </div>
  );
};
