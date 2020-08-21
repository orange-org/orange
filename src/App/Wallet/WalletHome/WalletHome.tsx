import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { cn } from "src/cn";
import s from "src/styles.css";
import { useHistory } from "react-router-dom";

export const WalletHome = () => {
  const walletMasterPublicKey = useSelector(
    state => state.walletMasterPublicKey,
  );
  const history = useHistory();

  useEffect(() => {
    if (!walletMasterPublicKey) {
      history.push("/");
    }
  }, [history, walletMasterPublicKey]);

  return (
    <>
      <h2>Details</h2>
      <h3>Master public key</h3>
      <blockquote>
        <code {...cn(s.displayBlock, s.overflowHidden, s.textOverflowEllipsis)}>
          {walletMasterPublicKey}
        </code>
      </blockquote>
    </>
  );
};
