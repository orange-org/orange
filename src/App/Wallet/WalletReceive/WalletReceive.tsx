import React from "react";
import { useSelector } from "react-redux";
import { Selectors } from "src/data/Selectors";

export const WalletReceive = () => {
  const walletAddressesAnalysis = useSelector(Selectors.getAddressesAnalysis);

  return (
    <div>
      <h2>Receive</h2>
      <p>Your current Bitcoin receiving address is:</p>
      <blockquote>
        <code>{walletAddressesAnalysis?.nextUnusedAddress}</code>
      </blockquote>
    </div>
  );
};
