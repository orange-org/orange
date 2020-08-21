import React from "react";
import { Route, Switch } from "react-router-dom";
import { CreateWallet } from "./CreateWallet/CreateWallet";
import { ImportWallet } from "./ImportWallet/ImportWallet";
import { WalletHome } from "./WalletHome/WalletHome";
import { WalletSend } from "./WalletSend/WalletSend";
import { WalletReceive } from "./WalletReceive/WalletReceive";

export const Wallet = () => (
  <Switch>
    <Route path="/wallet/create">
      <CreateWallet />
    </Route>

    <Route path="/wallet/import">
      <ImportWallet />
    </Route>

    <Route path="/wallet/send">
      <WalletSend />
    </Route>

    <Route path="/wallet/receive">
      <WalletReceive />
    </Route>

    <Route path="/wallet">
      <WalletHome />
    </Route>
  </Switch>
);
