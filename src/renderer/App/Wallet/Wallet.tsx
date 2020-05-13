import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { AccessExistingWallet } from "./AccessExistingWallet/AccessExistingWallet";

export const Wallet = () => {
  const history = useHistory();
  const a = useAtomicCss();

  useEffect(() => {
    history.push("/wallet/import");
  }, [history]);

  return (
    <div className={a("topLevelComponent")}>
      <Switch>
        <Route path="/wallet/import">
          <AccessExistingWallet />
        </Route>
      </Switch>
    </div>
  );
};
