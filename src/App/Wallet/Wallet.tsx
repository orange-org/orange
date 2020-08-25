import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { WalletOpen } from "./WalletOpen/WalletOpen";
import { WalletCreate } from "./WalletCreate/WalletCreate";

export const Wallet = () => (
  <Switch>
    <Route path="/wallet/create">
      <WalletCreate />
    </Route>

    <Route path="/wallet/open">
      <WalletOpen />
    </Route>
  </Switch>
);
