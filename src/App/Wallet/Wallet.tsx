import React from "react";
import { Route, Switch } from "react-router-dom";
import { WalletCreate } from "./WalletCreate/WalletCreate";
import { WalletHome } from "./WalletHome/WalletHome";
import { WalletImport } from "./WalletImport/WalletImport";

export const Wallet = () => (
  <Switch>
    <Route path="/wallet/create">
      <WalletCreate />
    </Route>

    <Route path="/wallet/import">
      <WalletImport />
    </Route>

    <Route path="/wallet">
      <WalletHome />
    </Route>
  </Switch>
);
