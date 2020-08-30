import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Page } from "src/App/common/Page";
import { cn } from "src/cn";
import { WalletThunks } from "src/data/WalletThunks";
import styles from "src/styles.css";
import { TxsWithBalance } from "src/data/Wallet";

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

const useInitialLoadWallet = () => {
  const walletMasterPublicKey = useSelector(
    state => state.walletMasterPublicKey,
  );
  const walletStats = useSelector(state => state.walletStats);
  const history = useHistory();
  const { loadWallet } = useLoadWallet();
  const [isInitialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      if (!walletMasterPublicKey) {
        history.push("/");
        return;
      }

      if (!walletStats) {
        await loadWallet(walletMasterPublicKey);
      }

      setInitialLoading(false);
    };

    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isInitialLoading;
};

const listTransactions = (txs: TxsWithBalance) => (
  <ul>
    {txs.map(tx => (
      <li key={tx.txid}>
        Date: {tx.status.block_time}, amount: {tx.balance}
      </li>
    ))}
  </ul>
);

export const WalletHome = () => {
  const globalState = useGlobalState();
  const isInitialLoading = useInitialLoadWallet();
  const { isLoadingWallet: isRefreshingWallet } = useLoadWallet();
  const isLoadingWallet = isInitialLoading || isRefreshingWallet;

  return (
    <Page title="Wallet">
      {isLoadingWallet ? (
        <h4>{isRefreshingWallet ? "Refreshing..." : "Loading wallet..."}</h4>
      ) : (
        <>
          <h4>
            <span>§</span>
            {globalState.walletStats?.balance.toLocaleString()}
          </h4>

          <h4>Transactions</h4>
          <h5>Pending</h5>
          {listTransactions(globalState.walletTxs!.mempool)}

          <h5>Confirmed</h5>
          {listTransactions(globalState.walletTxs!.confirmed)}
        </>
      )}
    </Page>
  );
};
