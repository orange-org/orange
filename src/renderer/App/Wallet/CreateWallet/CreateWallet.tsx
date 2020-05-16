import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Typography, Button } from "@material-ui/core";
import { Link, Route, Switch } from "react-router-dom";
import { CreateWalletWithExistingKey } from "./CreateWalletWithExistingKey/CreateWalletWithExistingKey";
import { ChooseCreateWalletType } from "./ChooseCreateWalletType/ChooseCreateWalletType";

export const CreateWallet = () => {
  const a = useAtomicCss();

  return (
    <div className={a("height100%")}>
      <Switch>
        <Route path="/wallet/create/withNewKey">
          {/* <CreateWalletWithNewKey /> */}
        </Route>

        <Route path="/wallet/create/withExistingKey">
          <CreateWalletWithExistingKey />
        </Route>

        <Route path="/wallet/create">
          <ChooseCreateWalletType />
        </Route>
      </Switch>
    </div>
  );
};
