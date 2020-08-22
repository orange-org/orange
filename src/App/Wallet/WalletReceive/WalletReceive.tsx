import React from "react";
import { useSelector } from "react-redux";

export const WalletReceive = () => {
  const walletStats = useSelector(state => state.walletStats);

  if (!walletStats) {
    return null;
  }

  return (
    <div>
      <h2>Receive</h2>
      <p>Your current Bitcoin receiving address is:</p>
      <blockquote>
        <code>{walletStats.nextUnusedAddress}</code>
      </blockquote>
    </div>
  );
};
