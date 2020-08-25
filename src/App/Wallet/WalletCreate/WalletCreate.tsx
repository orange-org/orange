import React, { useEffect, useState } from "react";
import { wallet } from "src/data/WalletThunks";
import { Page } from "src/App/common/Page";

import s from "src/styles.css";
import { cn } from "src/cn";
import { Switch, Route } from "react-router-dom";
import { useHandleCreateWallet } from "../common/useHandleCreateWallet";
import { WalletCreateSecret } from "./WalletCreateSecret/WalletCreateSecret";
import { WalletCreateConfirm } from "./WalletCreateConfirm/WalletCreateConfirm";

const useGenerateMnemonic = () => {
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  useEffect(() => {
    setMnemonic(wallet.generateMnemonic());
  }, []);

  return mnemonic;
};

export const WalletCreate = () => {
  const mnemonic = useGenerateMnemonic();
  // const handleCreateWallet = useHandleCreateWallet();

  return (
    <>
      {mnemonic ? (
        <Switch>
          <Route path="/wallet/create/confirm">
            <WalletCreateConfirm mnemonic={mnemonic} />
          </Route>

          <Route path="/wallet/create">
            <WalletCreateSecret mnemonic={mnemonic} />
          </Route>
        </Switch>
      ) : (
        <p>Creating wallet...</p>
      )}
    </>
  );
};
