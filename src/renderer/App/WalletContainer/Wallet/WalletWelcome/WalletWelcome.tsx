import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Welcome } from "../../common/Welcome";

export const WalletWelcome = () => {
  const { walletName } = useParams();
  const location = useLocation();

  return (
    <Welcome
      prompt="You don't have any transactions yet"
      action="Receive some Bitcoin"
      to={{
        pathname: `/wallet/${walletName}/receive`,
        state: { background: location },
      }}
    />
  );
};
