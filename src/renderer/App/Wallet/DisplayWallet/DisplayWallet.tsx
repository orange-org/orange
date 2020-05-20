import React from "react";
import { useParams } from "react-router-dom";

export const DisplayWallet = () => {
  const { walletName } = useParams();

  return <div>DISPLAY {walletName}</div>;
};
