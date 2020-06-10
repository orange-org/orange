import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { WalletUtils } from "_r/redux/WalletUtils";
import { RpcService } from "_r/RpcService/RpcService";
import { useDispatch } from "react-redux";
import { Thunks } from "_r/redux/Thunks";
import { CreateWallet } from "./CreateWallet/CreateWallet";
import { WalletContainerWelcome } from "./WalletContainerWelcome/WalletContainerWelcome";
import { Wallet } from "./Wallet/Wallet";

const useAutomaticRedirect = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      const orangeWallets = await dispatch(
        Thunks.requestOrangeWalletsList(__NONCE__),
      );

      if (orangeWallets.length > 0) {
        history.push(`/wallet/${encodeURIComponent(orangeWallets[0])}`);
      } else {
        history.push("/wallet/welcome");
      }
    };

    request();
  }, [dispatch, history]);
};

export const WalletContainer = () => {
  const a = useAtomicCss();

  useAutomaticRedirect();

  return (
    <div className={a("topLevelComponent")}>
      <Switch>
        <Route path="/wallet/welcome">
          <WalletContainerWelcome />
        </Route>

        <Route path="/wallet/create">
          <CreateWallet />
        </Route>

        <Route path="/wallet/:walletName">
          <Wallet />
        </Route>
      </Switch>
    </div>
  );
};
