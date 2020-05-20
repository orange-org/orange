import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { rpcService } from "_r/rpcClient/rpcService";
import { getOrangeWalletList } from "_r/redux/walletDataHelpers";
import { CreateWallet } from "./CreateWallet/CreateWallet";
import { DisplayWallet } from "./DisplayWallet/DisplayWallet";

export const Wallet = () => {
  const history = useHistory();
  const a = useAtomicCss();

  useEffect(() => {
    const request = async () => {
      const orangeWallets = getOrangeWalletList(
        await rpcService.listWallets(__NONCE__),
      );

      if (orangeWallets.length > 0) {
        history.push(`/wallet/${encodeURIComponent(orangeWallets[0])}`);
      } else {
        history.push("/wallet/create");
      }
    };

    request();
  }, [history]);

  return (
    <div className={a("topLevelComponent")}>
      <Switch>
        <Route path="/wallet/create">
          <CreateWallet />
        </Route>

        <Route path="/wallet/:walletName">
          <DisplayWallet />
        </Route>
      </Switch>
    </div>
  );
};
