import React, { useEffect } from "react";
import { useParams, useHistory, Switch, Route } from "react-router-dom";
import { RpcService } from "_r/RpcService/RpcService";
import { WalletContainerWelcome } from "../WalletContainerWelcome/WalletContainerWelcome";
import { CreateWallet } from "../CreateWallet/CreateWallet";
import { WalletWelcome } from "./WalletWelcome/WalletWelcome";
import { WalletTransactions } from "./WalletTransactions/WalletTransactions";

const useAutomaticRedirect = () => {
  const { walletName } = useParams();
  const history = useHistory();

  useEffect(() => {
    const request = async () => {
      const transactions = await RpcService.listTransactions(
        __NONCE__,
        walletName!,
      );

      history.push(
        `/wallet/${walletName}/${
          transactions.length === 0 ? "welcome" : "transactions"
        }`,
      );
    };

    request();
  }, [history, walletName]);
};

export const Wallet = () => {
  useAutomaticRedirect();

  return (
    <Switch>
      <Route path="/wallet/:walletName/welcome">
        <WalletWelcome />
      </Route>

      <Route path="/wallet/:walletName/transactions">
        <WalletTransactions />
      </Route>
    </Switch>
  );
};
