import React, { useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { RpcService } from "_r/RpcService/RpcService";
import { useDispatch } from "react-redux";
import { Thunks } from "_r/redux/Thunks";
import { WalletReceive } from "./WalletReceiveDialog/WalletReceiveDialog";
import { WalletTransactions } from "./WalletTransactions/WalletTransactions";
import { WalletWelcome } from "./WalletWelcome/WalletWelcome";

const useAutomaticRedirect = () => {
  const { walletName } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      await dispatch(Thunks.loadWalletIfNecessary(__NONCE__, walletName!));

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
  }, [dispatch, history, walletName]);
};

const useBackgroundState = () => {
  const location = useLocation();
  const background = location.state && (location.state as any).background;

  return { location, background };
};

export const Wallet = () => {
  useAutomaticRedirect();

  const { location, background } = useBackgroundState();

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
