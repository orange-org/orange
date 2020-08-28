import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Page } from "src/App/common/Page";
import { cn } from "src/cn";
import { WalletThunks } from "src/data/WalletThunks";
import styles from "src/styles.css";

const useGlobalState = () => ({
  walletMasterPublicKey: useSelector(state => state.walletMasterPublicKey),
  walletStats: useSelector(state => state.walletStats),
  walletTxs: useSelector(state => state.walletTxs),
});

const useLoadWallet = () => {
  const dispatch = useDispatch();
  const [isLoadingWallet, setLoadingWallet] = useState(false);

  return {
    loadWallet: async (walletMasterPublicKey: string) => {
      setLoadingWallet(true);
      await dispatch(WalletThunks.loadWallet(walletMasterPublicKey));
      setLoadingWallet(false);

      return isLoadingWallet;
    },

    isLoadingWallet,
  };
};

const useInitialLoadWallet = (walletMasterPublicKey: string | null) => {
  const history = useHistory();
  const { loadWallet } = useLoadWallet();
  const [isInitialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      if (!walletMasterPublicKey) {
        history.push("/");
        return;
      }

      await loadWallet(walletMasterPublicKey);
      setInitialLoading(false);
    };

    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isInitialLoading;
};

export const WalletHome = () => {
  const globalState = useGlobalState();
  const isInitialLoading = useInitialLoadWallet(
    globalState.walletMasterPublicKey,
  );
  const { isLoadingWallet: isRefreshingWallet } = useLoadWallet();
  const isLoadingWallet = isInitialLoading || isRefreshingWallet;

  console.log("globals", globalState.walletTxs);

  return (
    <Page title="Wallet">
      {isLoadingWallet ? (
        <h4>{isRefreshingWallet ? "Refreshing..." : "Loading wallet..."}</h4>
      ) : (
        <>
          <h4 {...cn(styles.fontWeightLighter)}>
            Balance is{" "}
            <span {...cn(styles.fontWeightNormal)}>
              {globalState.walletStats?.balance.toLocaleString()}
            </span>{" "}
            sats
          </h4>

          <h4 {...cn(styles.fontWeightLighter)}>Transactions</h4>
        </>
      )}
    </Page>
  );
};
