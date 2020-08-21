import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cn } from "src/cn";
import s from "src/styles.css";
import { useHistory } from "react-router-dom";
import { WalletThunks } from "src/data/WalletThunks";

const useGlobalState = () => {
  return {
    walletMasterPublicKey: useSelector(state => state.walletMasterPublicKey),
    walletBalance: useSelector(state => state.walletBalance),
    walletPendingBalance: useSelector(state => state.walletPendingBalance),
    walletAddresses: useSelector(state => state.walletAddresses),
    walletChangeAddresses: useSelector(state => state.walletChangeAddresses),
  };
};

const useInitialFetch = (walletMasterPublicKey: string | null) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isFetchingInitialState, setFetchingInitialState] = useState<boolean>(
    true,
  );

  useEffect(() => {
    const request = async () => {
      if (!walletMasterPublicKey) {
        history.push("/");
        return;
      }

      setFetchingInitialState(true);
      await dispatch(
        WalletThunks.loadWalletInitialState(walletMasterPublicKey),
      );
      setFetchingInitialState(false);
    };

    request();
  }, [history, walletMasterPublicKey]);

  return isFetchingInitialState;
};

const list = (addresses: string[]) => {
  return (
    <ul>
      {addresses.map(address => (
        <li key={address}>{address}</li>
      ))}
    </ul>
  );
};

export const WalletHome = () => {
  const globalState = useGlobalState();
  const isFetchingInitialState = useInitialFetch(
    globalState.walletMasterPublicKey,
  );

  return (
    <>
      <h2>Details</h2>
      <h3>Master public key</h3>
      <blockquote>
        <code {...cn(s.displayBlock, s.overflowHidden, s.textOverflowEllipsis)}>
          {globalState.walletMasterPublicKey}
        </code>
      </blockquote>

      {isFetchingInitialState ? (
        <h4>Loading wallet...</h4>
      ) : (
        <>
          <h3>Balance</h3>
          <p>{globalState.walletBalance}</p>

          <h3>Pending balance</h3>
          <p>{globalState.walletPendingBalance}</p>

          <h3>Addresses</h3>
          {list(globalState.walletAddresses!)}

          <h3>Change addresses</h3>
          {list(globalState.walletChangeAddresses!)}
        </>
      )}
    </>
  );
};
