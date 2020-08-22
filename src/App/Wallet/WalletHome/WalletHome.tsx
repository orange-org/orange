import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cn } from "src/cn";
import s from "src/styles.css";
import { useHistory, Link } from "react-router-dom";
import { WalletThunks } from "src/data/WalletThunks";

const useGlobalState = () => {
  return {
    walletMasterPublicKey: useSelector(state => state.walletMasterPublicKey),
    walletStats: useSelector(state => state.walletStats),
  };
};

const useFetchWalletState = () => {
  const dispatch = useDispatch();
  const [isFetchingState, setFetchingState] = useState(false);

  return {
    fetchWalletState: async (walletMasterPublicKey: string) => {
      setFetchingState(true);
      await dispatch(WalletThunks.loadAddressData(walletMasterPublicKey));
      setFetchingState(false);

      return isFetchingState;
    },

    isFetchingState,
  };
};

const useInitialFetch = (walletMasterPublicKey: string | null) => {
  const history = useHistory();
  const { fetchWalletState } = useFetchWalletState();
  const [isInitialFetching, setInitialFetching] = useState(true);

  useEffect(() => {
    const request = async () => {
      if (!walletMasterPublicKey) {
        history.push("/");
        return;
      }

      await fetchWalletState(walletMasterPublicKey);
      setInitialFetching(false);
    };

    request();
  }, [history, walletMasterPublicKey]);

  return isInitialFetching;
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
  const isInitialFetching = useInitialFetch(globalState.walletMasterPublicKey);
  const {
    fetchWalletState,
    isFetchingState: isRefreshingState,
  } = useFetchWalletState();
  const isFetchingState = isInitialFetching || isRefreshingState;

  return (
    <>
      <h2>Details</h2>
      <h3>Master public key</h3>
      <blockquote>
        <code {...cn(s.displayBlock, s.overflowHidden, s.textOverflowEllipsis)}>
          {globalState.walletMasterPublicKey}
        </code>
      </blockquote>

      {isFetchingState ? (
        <h4>{isRefreshingState ? "Refreshing..." : "Loading wallet..."}</h4>
      ) : (
        <>
          <h3>Actions</h3>
          <div>
            <button
              type="button"
              onClick={() =>
                fetchWalletState(globalState.walletMasterPublicKey!)
              }
            >
              Refresh
            </button>{" "}
            |{" "}
            <Link to="/wallet/send">
              <button type="button">Send</button> |{" "}
            </Link>
            <Link to="/wallet/receive">
              <button type="button">Receive</button>
            </Link>
          </div>

          <h3>Balance</h3>
          <p>{globalState.walletStats?.balance}</p>

          <h3>Pending balance</h3>
          <p>{globalState.walletStats?.pendingBalance}</p>

          <h3>Addresses</h3>
          {list(globalState.walletStats!.addresses)}

          <h3>Change addresses</h3>
          {list(globalState.walletStats!.changeAddresses)}
        </>
      )}
    </>
  );
};
