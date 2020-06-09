import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { WalletUtils } from "_r/redux/WalletUtils";
import { RpcService } from "_r/RpcService/RpcService";
import { CreateWallet } from "./CreateWallet/CreateWallet";
import { WalletWelcome } from "./WalletWelcome/WalletWelcome";
// import { rpcService } from "_r/rpcClient/rpcService";
// import { getOrangeWalletList } from "_r/redux/walletDataHelpers";
// import { CreateWallet } from "./CreateWallet/CreateWallet";
// import { DisplayWallet } from "./DisplayWallet/DisplayWallet";

export const Wallet = () => {
  const history = useHistory();
  const a = useAtomicCss();

  useEffect(() => {
    const request = async () => {
      const orangeWallets = WalletUtils.getOrangeWalletList(
        await RpcService.listWallets(__NONCE__),
      );

      if (orangeWallets.length > 0) {
        history.push(`/wallet/${encodeURIComponent(orangeWallets[0])}`);
      } else {
        history.push("/wallet/welcome");
      }
    };

    request();
  }, [history]);

  return (
    <div className={a("topLevelComponent")}>
      <Switch>
        <Route path="/wallet/welcome">
          <WalletWelcome />
        </Route>

        <Route path="/wallet/create">
          <CreateWallet />
        </Route>

        {/* <Route path="/wallet/:walletName">
          <DisplayWallet />
        </Route> */}
      </Switch>
    </div>
  );
};
