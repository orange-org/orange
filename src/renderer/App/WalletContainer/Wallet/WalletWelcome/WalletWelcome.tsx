import React from "react";
import { useParams } from "react-router-dom";
import { Welcome } from "../../common/Welcome";

export const WalletWelcome = () => {
  const { walletName } = useParams();

  return (
    <Welcome
      prompt="You don't have any transactions yet"
      action="Receive some Bitcoin"
      link={`/wallet/${walletName}/receive`}
    />
  );
};
