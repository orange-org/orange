import React from "react";
import { Welcome } from "../common/Welcome";

export const WalletContainerWelcome = () => (
  <Welcome
    prompt="You don't have a wallet yet"
    action="Create one"
    to="/wallet/create"
  />
);
