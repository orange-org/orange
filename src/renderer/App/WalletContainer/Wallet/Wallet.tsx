import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import { useLocationStateBackground } from "_r/App/hooks/useLocationStateBackground";
import { Thunks } from "_r/redux/Thunks";
import { Selectors } from "_r/redux/Selectors";
import { WalletReceive } from "./WalletReceiveDialog/WalletReceiveDialog";
import { WalletTransactions } from "./WalletTransactions/WalletTransactions";
import { WalletWelcome } from "./WalletWelcome/WalletWelcome";
import { useWalletName } from "./common/useWalletName";

const useTransactionList = () => {
  const dispatch = useDispatch();
  const walletName = useWalletName();

  useEffect(() => {
    dispatch(Thunks.listTransactions(__NONCE__, walletName!));
  }, [dispatch, walletName]);

  return useSelector(Selectors.transactionList);
};

const useAutomaticRedirect = () => {
  const { walletName } = useParams();
  const history = useHistory();
  const transactionList = useTransactionList();

  useEffect(() => {
    if (transactionList) {
      history.push(
        `/wallet/${walletName}/${
          transactionList.length ? "transactions" : "welcome"
        }`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!transactionList]);
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
