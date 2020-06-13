import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import { useLocationStateBackground } from "_r/App/hooks/useLocationStateBackground";
import { Thunks } from "_r/redux/Thunks";
import { WalletReceive } from "./WalletReceiveDialog/WalletReceiveDialog";
import { WalletTransactions } from "./WalletTransactions/WalletTransactions";
import { WalletWelcome } from "./WalletWelcome/WalletWelcome";
import { useTransactionList } from "./common/useTransactionList";

const useAutomaticRedirect = () => {
  const { walletName } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const transactionList = useTransactionList();

  useEffect(() => {
    if (transactionList) {
      history.push(
        `/wallet/${walletName}/${
          transactionList.length ? "transactions" : "welcome"
        }`,
      );
    }
  }, [dispatch, history, transactionList, walletName]);
};

export const Wallet = () => {
  useAutomaticRedirect();

  const { location, background } = useLocationStateBackground();

  return (
    <div>
      <Switch location={background || location}>
        <Route path="/wallet/:walletName/welcome">
          <WalletWelcome />
        </Route>

        <Route path="/wallet/:walletName/transactions">
          <WalletTransactions />
        </Route>
      </Switch>

      {background && (
        <Route path="/wallet/:walletName/receive">
          <WalletReceive />
        </Route>
      )}
    </div>
  );
};
