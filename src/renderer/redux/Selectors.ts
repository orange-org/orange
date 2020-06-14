import { createSelector } from "reselect";
import { State } from "./ReducerCreator";

export class Selectors {
  static hasPeers = (state: State) =>
    state.peerInfo && state.peerInfo.length > 0;

  static isSyncing = (state: State) =>
    state.blockchainInfo?.headers &&
    state.blockchainInfo?.headers > 1 &&
    state.blockchainInfo?.headers !== state.blockchainInfo?.blocks;

  static transactionList = (state: State) => state.transactionList;

  static pendingTransactions = createSelector(
    Selectors.transactionList,
    transactionList =>
      transactionList?.filter(
        walletTransaction => walletTransaction.confirmations < 6,
      ),
  );

  static confirmedTransactions = createSelector(
    Selectors.transactionList,
    transactionList =>
      transactionList?.filter(
        walletTransaction => walletTransaction.confirmations >= 6,
      ),
  );
}
