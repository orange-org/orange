import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
// import { CreateWalletWithExistingKey } from "./CreateWalletWithExistingKey/CreateWalletWithExistingKey";
import { ChooseCreateWalletType } from "./ChooseCreateWalletType/ChooseCreateWalletType";
import { CreateWalletWithNewKey } from "./CreateWalletWithNewKey/CreateWalletWithNewKey";

export const CreateWallet = () => {
  const a = useAtomicCss();

  return (
    <div className={a("marginTop08")}>
      <Switch>
        <Route path="/wallet/create/withNewKey">
          <CreateWalletWithNewKey />
        </Route>

        {/* <Route path="/wallet/create/withExistingKey"> */}
        {/* <CreateWalletWithExistingKey /> */}
        {/* </Route> */}

        <Route path="/wallet/create">
          <ChooseCreateWalletType />
        </Route>
      </Switch>
    </div>
  );
};
