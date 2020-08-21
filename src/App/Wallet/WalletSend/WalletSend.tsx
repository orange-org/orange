import React from "react";
import { useSelector } from "react-redux";
import { Selectors } from "src/data/Selectors";

export const WalletSend = () => {
  const walletAddressesAnalysis = useSelector(Selectors.getAddressesAnalysis);

  return (
    <div>
      <h2>Send</h2>
    </div>
  );
};
