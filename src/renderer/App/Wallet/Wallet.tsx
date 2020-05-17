import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { CompensateToolbarHeight } from "../components/CompensateToolbarHeight/CompensateToolbarHeight";
import { CreateWallet } from "./CreateWallet/CreateWallet";

export const Wallet = () => {
  const history = useHistory();
  const a = useAtomicCss();

  useEffect(() => {
    history.push("/wallet/create/withNewKey");
  }, [history]);

  return (
    <div className={a("topLevelComponent")}>
      <CompensateToolbarHeight />

      <Switch>
        <Route path="/wallet/create">
          <CreateWallet />
        </Route>
      </Switch>
    </div>
  );
};
